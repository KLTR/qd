import os

from server.deployment.util import is_env_enabled
from server.deployment import kube, Recipe


class QuantumUI(Recipe):
    def _add_ingress(self):
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
        i = kube.Ingress(name='quantum-ui-ingress', rules=rules)
        self.add_component(i)

    def load_components(self):
        super(QuantumUI, self).load_components()

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
            target_port=8080,
        )

        self.add_component(d)
        self.add_component(s)

        if is_env_enabled('K8S_LOCAL_DEV'):
            self.add_component(kube.File(os.path.join(
                self.dir_path,
                'k8s/quantumui-ingress-dev-config.yaml')))
        else:
            self.add_component(kube.File(os.path.join(
                self.dir_path,
                'k8s/quantumui-ingress-prod-config.yaml')))

        self._add_ingress()
