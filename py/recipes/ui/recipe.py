import os

from server.deployment import kube, Recipe

class QuantumUI(Recipe):
    def load_components(self):
        super(QuantumUI, self).load_components()

        d = kube.Deployment(
            name='quantum-ui',
            image='sr-rnd-105.swg.local:5000/go-ng-ui-quantum:{}'.format(
                os.environ.get('GO_SERVER_CORE_IMAGE_TAG', 'latest')),
            ports=[
                {'containerPort': 80},
                ],
        )

        self.add_components([
            d,
            kube.File(os.path.join(self.dir_path, 'k8s/quantumui-service.yaml')),
        ])

class ReignUI(Recipe):
    pass

class AliceUI(Recipe):
    pass