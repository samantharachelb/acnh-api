# Instructions for deploying to Kubernetes

_Please note that this guide assumes that you are working out of the `kubernetes/` directory_

## Deployment
- Install the `kubernetes/ingress-nginx` Kubernetes Ingress controller.
`kubectl apply -f https://raw.githubusercontent.com/kubernetes/ingress-nginx/controller-v0.34.1/deploy/static/provider/do/deploy.yaml`

- Deploy nginx configmap to the cluster
`kubectl apply -f nginx-ingress-controller-configmap.yaml`

- Deploy application Ingress configuration
`kubectl apply -f deploy-app-ingress.yaml`

- Deploy application
`kubectl apply -f deploy-app,yaml`
