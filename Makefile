ifndef QD_GO_ROOT
$(error 'QD_GO_ROOT not exists')
endif

QD_GO_MAKEFILE_PATH := ${QD_GO_ROOT}/sr-rnd-00.swg.local/go/makefile

include ${QD_GO_MAKEFILE_PATH}/Makefile.base

USE_NPM_SERVER_URL ?= http://npm.dev.swg.local:4873
DOCKER_IMAGE_TAG ?= $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null | tr / -)
DOCKER_CANONICAL_IMAGE ?= sr-rnd-105.swg.local:5000/go-client-quantum-ui:${DOCKER_IMAGE_TAG}
ALT_NPM_INSTALL_PACKAGES ?= @common/intels@0.0.5
USE_NG_BUILD ?= build-prod

docker-build:
	docker build \
		--build-arg USE_NPM_REGISTRY=${USE_NPM_SERVER_URL} \
		--build-arg ALT_NPM_INSTALL_PACKAGES=${ALT_NPM_INSTALL_PACKAGES} \
		--build-arg ALT_NPM_INSTALL_PACKAGES=${ALT_NPM_INSTALL_PACKAGES} \
		--build-arg USE_NG_BUILD=${USE_NG_BUILD} \
		-f docker/Dockerfile . -t ${DOCKER_CANONICAL_IMAGE}

docker-push:
	docker push ${DOCKER_CANONICAL_IMAGE}
