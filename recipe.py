import os

from server.deployment import kube, Recipe, is_env_enabled


class QuantumUI(Recipe):
    def _load_deployment(self):
        d = kube.Deployment(
            name='quantum-ui',
            image='sr-rnd-105.swg.local:5000/go-client-quantum-ui:{}'.format(
                os.environ.get('GO_SERVER_QUANTUM_UI_IMAGE_TAG', 'latest')),
            image_pull_policy='IfNotPresent',
            ports=[
                {'containerPort': 80},
            ],
            volume_mounts=[
                {
                    'name': 'quantum-ui-config',
                    'mountPath': '/usr/share/nginx/html/assets/config/appConfig.json',
                    'subPath': 'appConfig.json',
                }
            ],
            volumes=[
                {
                    'name': 'quantum-ui-config',
                    'configMap': {
                        'name': 'quantum-ui-config'
                    }
                }
            ]
        )

        s = kube.Service(
            name='quantum-ui',
            service_port=80,
            target_port=80,
        )

        self.add_component(d)
        self.add_component(s)

    def _load_config(self):
        self.add_component(kube.File(
            os.path.join(self.dir_path, 'k8s/config.yaml'),
            k8s_domain=os.environ['K8S_DOMAIN']))

    def _load_ingress(self):
        rules = [
            {
                'host': os.environ['K8S_INGRESS_QUANTUM_UI'],
                'http': {
                    'paths': [
                        {
                            'path': '/',
                            'backend': {
                                'serviceName': 'quantum-ui',
                                'servicePort': 80
                            }
                        }
                    ]
                }
            }
        ]

        self.add_component(
            kube.IngressController(
                name='ui-ingress-controller',
                host_network=True,
                ingress_class='ui',
                ports=[
                    {
                        'name': 'http',
                        'containerPort': 80,
                    },
                    {
                        'name': 'default',
                        'containerPort': 5481,
                    },
                    {
                        'name': 'healthz',
                        'containerPort': 5482,
                    },
                    {
                        'name': 'https',
                        'containerPort': 443,
                    },
                ]
            ))

        if os.environ['K8S_CONTEXT'] == 'docker-for-desktop':
            self.add_component(kube.Docker4DesktopIngressNginxLoadBalancer(
                name='ui-ingress-controller-lb',
                selector='ui-ingress-controller',
                ports=[
                    {
                        'name': 'http',
                        'port': 80,
                        'targetPort': 'http',
                    },
                    {
                        'name': 'https',
                        'port': 443,
                        'targetPort': 'https',
                    }
                ],
            ))

        self.add_component(
            kube.Ingress(
                name='ui-quantum-ingress',
                ingress_class='ui',
                rules=rules,
                cors=True,
            ))

    def load_components(self):
        super(QuantumUI, self).load_components()
        self._load_deployment()
        self._load_config()
        self._load_ingress()
