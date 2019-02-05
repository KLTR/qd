ifndef QD_GO_ROOT
$(error 'QD_GO_ROOT not exists')
endif

QD_GO_MAKEFILE_PATH := ${QD_GO_ROOT}/sr-rnd-00.swg.local/go/makefile

DOCKER_PROJECT := go-ng-ui-quantum

include ${QD_GO_MAKEFILE_PATH}/Makefile.base

include ${MAKEFILE_ROOT}/Makefile.docker
include ${MAKEFILE_ROOT}/Makefile.gitlab

ng-docker:
	make docker-ui-image

quantum-ui: ng-docker
