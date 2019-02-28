ifndef QD_GO_ROOT
$(error 'QD_GO_ROOT not exists')
endif

QD_GO_MAKEFILE_PATH := ${QD_GO_ROOT}/sr-rnd-00.swg.local/go/makefile
QD_GO_DEPLOYMENT_ENV_PATH := ${QD_GO_ROOT}/sr-rnd-00.swg.local/go/server/deployment/quantum/env

DOCKER_PROJECT := go-client-quantum-ui

include ${QD_GO_MAKEFILE_PATH}/Makefile.base
include ${QD_GO_MAKEFILE_PATH}/k8s/Makefile.k8s

include ${MAKEFILE_ROOT}/Makefile.docker
include ${MAKEFILE_ROOT}/Makefile.gitlab

ng-docker:
	make docker-ui-image

quantum-ui: ng-docker

install-common: 
	sed -i '/@common\/intels/d' ./package.json
	npm install 
	cd ../../common && ng build  
	cd ../../common/dist/intels && npm pack && cp common-intels-0.0.1.tgz ../../../quantum/quantum-ui/
	npm install common-intels-0.0.1.tgz
	sudo ng s
	