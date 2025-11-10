import YAML from 'yamljs';
import path from 'path';

// For small projects we include a simple OpenAPI yaml; in production generate from code or write more details.
export const swaggerDoc = YAML.load(path.join(__dirname, '..', 'openapi.yaml'));