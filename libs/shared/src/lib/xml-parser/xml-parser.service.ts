import { Injectable } from '@angular/core';
import XMLBuilder from 'fast-xml-builder';
import { XMLParser } from 'fast-xml-parser';

const XML_OPTIONS = {
  '?xml': {
    '@_version': '1.0',
    '@_encoding': 'UTF-8',
  },
};

const BUILDER_CONFIG = {
  ignoreAttributes: false,
  attributeNamePrefix: '@_',
  format: true,
  indentBy: '  ',
};

@Injectable()
export class XmlParserService {
  xmlToJson(xml: string): Record<string, unknown> {
    const parser = new XMLParser();
    return parser.parse(xml);
  }

  jsonToXML(json: Record<string, unknown>): string {
    const builder = new XMLBuilder(BUILDER_CONFIG);
    const xml = builder.build({ ...XML_OPTIONS, ...json });
    return xml;
  }
}
