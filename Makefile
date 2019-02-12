ifndef QD_GO_ROOT
$(error 'QD_GO_ROOT not exists')
endif

ifndef ENV
$(error 'ENV not exists')
endif

QD_GO_MAKEFILE_PATH := ${QD_GO_ROOT}/sr-rnd-00.swg.local/go/makefile
QD_GO_DEPLOYMENT_ENV_PATH := ${QD_GO_ROOT}/sr-rnd-00.swg.local/go/server/deployment/quantum/env

DOCKER_PROJECT := go-ng-ui-quantum

include ${QD_GO_MAKEFILE_PATH}/Makefile.base
include ${QD_GO_MAKEFILE_PATH}/k8s/Makefile.k8s

include ${MAKEFILE_ROOT}/Makefile.docker
include ${MAKEFILE_ROOT}/Makefile.gitlab

include ${QD_GO_DEPLOYMENT_ENV_PATH}/${ENV}.mk

ng-docker:
	make docker-ui-image

quantum-ui: ng-docker
