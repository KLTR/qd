ifndef QD_GO_ROOT
$(error 'QD_GO_ROOT not exists')
endif

QD_GO_MAKEFILE_PATH := ${QD_GO_ROOT}/sr-rnd-00.swg.local/go/makefile

include ${QD_GO_MAKEFILE_PATH}/Makefile.base

RELEASE ?= 1

NG_BUILD_ARGS ?=
ifeq (${RELEASE},1)
NG_BUILD_ARGS += --prod
endif

COMMON_VERSION ?= 0.1.1
USE_NPM_SERVER_URL ?= http://npm.dev.swg.local:4873
GIT_HASH_TAG ?= $(shell git rev-parse HEAD 2>/dev/null | tr / -)
DOCKER_IMAGE_TAG ?= $(shell git rev-parse --abbrev-ref HEAD 2>/dev/null | tr / -)
DOCKER_CANONICAL_IMAGE ?= sr-rnd-105.swg.local:5000/go-client-quantum-ui:${DOCKER_IMAGE_TAG}
ALT_NPM_INSTALL_PACKAGES ?= @common/intels@${COMMON_VERSION}

docker-build:
	docker build \
		--build-arg USE_NPM_REGISTRY=${USE_NPM_SERVER_URL} \
		--build-arg ALT_NPM_INSTALL_PACKAGES=${ALT_NPM_INSTALL_PACKAGES} \
		--build-arg NG_BUILD_ARGS="${NG_BUILD_ARGS}" \
		--build-arg GIT_HASH_TAG=${GIT_HASH_TAG} \
		-f docker/Dockerfile . -t ${DOCKER_CANONICAL_IMAGE}

docker-push:
	docker push ${DOCKER_CANONICAL_IMAGE}

install-common: 
	sed -i '/@common\/intels/d' ./package.json
	npm install 
	cd ../../common && ng build  
	cd ../../common/dist/intels && npm pack && cp common-intels-0.1.1.tgz ../../../quantum/quantum-ui/
	npm install common-intels-0.1.1.tgz
