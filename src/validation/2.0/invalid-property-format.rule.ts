/**
 * @license
 * Copyright 2017 Red Hat
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *      http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {Oas20Document} from "../../models/2.0/document.model";
import {Oas20ValidationRule} from "./common.rule";
import {Oas20Info} from "../../models/2.0/info.model";
import {Oas20License} from "../../models/2.0/license.model";
import {Oas20Operation} from "../../models/2.0/operation.model";
import {Oas20ExternalDocumentation} from "../../models/2.0/external-documentation.model";
import {Oas20Parameter} from "../../models/2.0/parameter.model";
import {Oas20Items} from "../../models/2.0/items.model";
import {Oas20Header} from "../../models/2.0/header.model";
import {Oas20Tag} from "../../models/2.0/tag.model";
import {Oas20SecurityScheme} from "../../models/2.0/security-scheme.model";
import {Oas20Contact} from "../../models/2.0/contact.model";
import {Oas20XML} from "../../models/2.0/xml.model";
import {OasValidationRuleUtil} from "../validation";

/**
 * Implements the Invalid Property Format validation rule.  This rule is responsible
 * for reporting whenever the value of a property fails to conform to the required
 * *format* for that property.
 */
export class Oas20InvalidPropertyFormatValidationRule extends Oas20ValidationRule {

    public visitDocument(node: Oas20Document): void {
        if (this.hasValue(node.host)) {
            this.reportIfInvalid("R-004", OasValidationRuleUtil.isValidHost(node.host), node, "host",
                `Host not properly formatted - only the host name (and optionally port) should be specified.`);
        }
        if (this.hasValue(node.basePath)) {
            this.reportIfInvalid("R-005", node.basePath.indexOf("/") === 0, node, "basePath",
                `Base Path should being with a '/' character.`);
        }
    }

    public visitInfo(node: Oas20Info): void {
        if (this.hasValue(node.description)) {
            this.reportIfInvalid("INF-003", OasValidationRuleUtil.isValidGFM(node.description), node, "description",
                `API description is an incorrect format.`);
        }
    }

    public visitContact(node: Oas20Contact): void {
        if (this.hasValue(node.url)) {
            this.reportIfInvalid("CTC-001", OasValidationRuleUtil.isValidUrl(node.url), node, "url",
                `Contact URL is an incorrect format.`);
        }
        if (this.hasValue(node.email)) {
            this.reportIfInvalid("CTC-002", OasValidationRuleUtil.isValidEmailAddress(node.email), node, "email",
                `Contact Email is an incorrect format.`);
        }
    }

    public visitLicense(node: Oas20License): void {
        if (this.hasValue(node.url)) {
            this.reportIfInvalid("LIC-002", OasValidationRuleUtil.isValidUrl(node.url), node, "url",
                `License URL is an incorrect format.`);
        }
    }

    public visitOperation(node: Oas20Operation): void {
        if (this.hasValue(node.description)) {
            this.reportIfInvalid("OP-002", OasValidationRuleUtil.isValidGFM(node.description), node, "description",
                `Operation Description is an incorrect format.`);
        }
        if (this.hasValue(node.consumes)) {
            this.reportIfInvalid("OP-005", OasValidationRuleUtil.isValidMimeType(node.consumes), node, "consumes",
                `Operation "consumes" must be a valid mime type.`);
        }
        if (this.hasValue(node.produces)) {
            this.reportIfInvalid("OP-006", OasValidationRuleUtil.isValidMimeType(node.produces), node, "produces",
                `Operation "produces" must be a valid mime type.`);
        }
    }

    public visitExternalDocumentation(node: Oas20ExternalDocumentation): void {
        if (this.hasValue(node.description)) {
            this.reportIfInvalid("ED-002", OasValidationRuleUtil.isValidGFM(node.description), node, "description",
                `External Docs Description is an incorrect format.`);
        }
        if (this.hasValue(node.url)) {
            this.reportIfInvalid("ED-003", OasValidationRuleUtil.isValidUrl(node.url), node, "url",
                `External Docs URL is an incorrect format.`);
        }
    }

    public visitParameter(node: Oas20Parameter): void {
        if (this.hasValue(node.description)) {
            this.reportIfInvalid("PAR-010", OasValidationRuleUtil.isValidGFM(node.description), node, "description",
                `Parameter Description is an incorrect format.`);
        }
    }

    public visitItems(node: Oas20Items): void {
        if (this.hasValue(node.default)) {
            this.reportIfInvalid("IT-007", OasValidationRuleUtil.isValidForType(node.default, node), node, "default",
                `Schema Items default value does not conform to the correct type.`);
        }
    }

    public visitHeader(node: Oas20Header): void {
        if (this.hasValue(node.default)) {
            this.reportIfInvalid("HEAD-005", OasValidationRuleUtil.isValidForType(node.default, node), node, "default",
                `The "default" property must conform to the "type" of the items.`);
        }
    }

    public visitTag(node: Oas20Tag): void {
        if (this.hasValue(node.description)) {
            this.reportIfInvalid("TAG-002", OasValidationRuleUtil.isValidGFM(node.description), node, "description",
                `Tag Description is an incorrect format.`);
        }
    }

    public visitSecurityScheme(node: Oas20SecurityScheme): void {
        if (this.hasValue(node.authorizationUrl)) {
            this.reportIfInvalid("SS-011", OasValidationRuleUtil.isValidUrl(node.authorizationUrl), node, "authorizationUrl",
                `Security Scheme Authorization URL is an incorrect format.`);
        }
        if (this.hasValue(node.tokenUrl)) {
            this.reportIfInvalid("SS-012", OasValidationRuleUtil.isValidUrl(node.tokenUrl), node, "tokenUrl",
                `Security Scheme Token URL is an incorrect format.`);
        }
    }

    public visitXML(node: Oas20XML): void {
        if (this.hasValue(node.namespace)) {
            this.reportIfInvalid("XML-001", OasValidationRuleUtil.isValidUrl(node.namespace), node, "namespace",
                `XML Namespace URL is an incorrect format.`);
        }
    }

}
