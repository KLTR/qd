import os

from server.deployment import kube, Recipe

class QuantumUI(Recipe):
    def load_components(self):
        super(QuantumUI, self).load_components()
        
        self.add_components([
            kube.File(os.path.join(self.dir_path, 'k8s/quantumui-deployment.yaml')),
            kube.File(os.path.join(self.dir_path, 'k8s/quantumui-service.yaml'))
        ])

class ReignUI(Recipe):
    pass

class AliceUI(Recipe):
    pass