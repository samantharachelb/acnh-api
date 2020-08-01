#!/bin/bash

# exit script when any command in this script returns with a non-zero exit code
set -e

COMMIT_SHA1=$CIRCLECI_SHA1
export COMMIT_SHA1=$COMMIT_SHA1

envsubst <./kubernetes/deploy_api.yaml >./kubernetes/deploy_api.yaml.out
mv ./kubernetes/deploy_api.yaml.out ./kubernetes/deploy_api.yaml

echo "$KUBERNETES_CLUSTER_CERTIFICATE" | base64 --decode > cert.crt

./kubectl \
  --kubeconfig=/dev/null \
  --server=$KUBERNETES_SERVER \
  --certificate-authority=cert.crt \
  --token=$KUBERNETES_TOKEN \
  apply -f ./kubernetes/deploy_api.yaml