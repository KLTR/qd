ifndef QD_GO_ROOT
$(error 'QD_GO_ROOT not exists')
endif

ifeq (${UNAME_S},Darwin)
export K8S_CONTEXT := docker-for-desktop
export K8S_NODE := ${K8S_CONTEXT}
endif

ifeq (${UNAME_S},Linux)
export K8S_NODE := $(shell hostname | tr '[:upper:]' '[:lower:]')
endif

ifeq (${UNAME_S},GitLabRunner)
export KUBECTL := kubectl
export K8S_NODE := $(shell kubectl get nodes -o name | cut -c 6-)
endif


QD_GO_MAKEFILE_PATH := ${QD_GO_ROOT}/sr-rnd-00.swg.local/go/makefile

DOCKER_PROJECT := go-ng-ui-quantum

include ${QD_GO_MAKEFILE_PATH}/Makefile.base
include ${QD_GO_MAKEFILE_PATH}/k8s/Makefile.k8s

include ${MAKEFILE_ROOT}/Makefile.docker
include ${MAKEFILE_ROOT}/Makefile.gitlab

ng-docker:
	make docker-ui-image

quantum-ui: ng-docker
