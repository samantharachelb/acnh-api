# ACNH Companion API Documentation

Within this folder you can find all of the openapi specification files.

`all.yaml` - Specification file for requests that retrieve ALL information
`resource.yaml` - Specification file for requests that retrieve specific resources

`includes/{endpoint}/response/{statusCode}`: Specification files containing response data
`includes/{endpoint}/response/examples/full`: Specification files containing example response data with all fields
`includes/{endpoint}/response/example/min`: Specification files containing example response data with minimal fields

### Building

To build the full OpenAPI specification file run the following command:
```bash
swagger-cli bundle openapi.yaml --outfile build/openapi.yaml --type yaml
```
