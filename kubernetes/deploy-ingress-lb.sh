#!/bin/bash
kubectl apply -f ingress-loadbalancer/namespace-serviceaccount.yaml
kubectl apply -f ingress-loadbalancer/controller-configmap.yaml
kubectl apply -f ingress-loadbalancer/clusterrole.yaml
kubectl apply -f ingress-loadbalancer/controller-role.yaml
kubectl apply -f ingress-loadbalancer/controller-rolebinding.yaml
kubectl apply -f ingress-loadbalancer/controller-service-webhook.yaml
kubectl apply -f ingress-loadbalancer/controller-service.yaml
kubectl apply -f ingress-loadbalancer/controller-deployment.yaml
kubectl apply -f ingress-loadbalancer/admission-webhook-validating-webhook.yaml
kubectl apply -f ingress-loadbalancer/admission-webhook-job-patch-serviceaccount.yaml
kubectl apply -f ingress-loadbalancer/admission-webhook-job-patch-clusterrole.yaml
kubectl apply -f ingress-loadbalancer/admission-webhook-job-patch-clusterrolebinding.yaml
kubectl apply -f ingress-loadbalancer/admission-webhook-job-patch-role.yaml
kubectl apply -f ingress-loadbalancer/admission-webhook-job-patch-rolebinding.yaml
kubectl apply -f ingress-loadbalancer/admission-webhook-job-patch-job-createSecret.yaml
kubectl apply -f ingress-loadbalancer/admission-webhook-job-patch-job-patchWebhook.yaml
