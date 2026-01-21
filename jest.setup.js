// jest.setup.js
import { toHaveNoViolations } from "jest-axe";

// Ajouter les matchers personnalisés de jest-axe pour des messages d'erreur explicites
expect.extend(toHaveNoViolations);