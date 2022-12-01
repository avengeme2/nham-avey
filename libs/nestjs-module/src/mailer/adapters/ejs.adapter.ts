import {
  AsyncTemplateFunction,
  ClientFunction,
  compile,
  TemplateFunction,
} from 'ejs'
import { get } from 'lodash'
import fs from 'node:fs'
import path from 'node:path'
import inlineCss from 'inline-css'

import { MailerOptions } from '../interfaces/mailer-options.interface'
import { TemplateAdapter } from '../interfaces/template-adapter.interface'
import { TemplateAdapterConfig } from '../interfaces/template-adapter-config.interface'

export class EjsAdapter implements TemplateAdapter {
  private precompiledTemplates: {
    [name: string]: TemplateFunction | AsyncTemplateFunction | ClientFunction
  } = {}

  private config: TemplateAdapterConfig = {
    inlineCssOptions: { url: ' ' },
    inlineCssEnabled: true,
  }

  constructor(config?: TemplateAdapterConfig) {
    Object.assign(this.config, config)
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  public compile(mail: any, callback: any, mailerOptions: MailerOptions): void {
    const { context, template } = mail.data
    const templateExt = path.extname(template) || '.ejs'
    const templateName = path.basename(template, path.extname(template))
    const templateDir = path.isAbsolute(template)
      ? path.dirname(template)
      : path.join(
          get(mailerOptions, 'template.dir', ''),
          path.dirname(template),
        )
    const templatePath = path.join(templateDir, templateName + templateExt)

    if (!this.precompiledTemplates[templateName]) {
      try {
        const template = fs.readFileSync(templatePath, 'utf-8')

        this.precompiledTemplates[templateName] = compile(template, {
          ...get(mailerOptions, 'template.options', {}),
          filename: templatePath,
        })
      } catch (err) {
        return callback(err)
      }
    }

    const rendered = this.precompiledTemplates[templateName](context)

    const render = (html: string) => {
      if (this.config.inlineCssEnabled) {
        inlineCss(html, this.config.inlineCssOptions as inlineCss.Options)
          .then(html => {
            mail.data.html = html
            return callback()
          })
          .catch(callback)
      } else {
        mail.data.html = html
        return callback()
      }
    }

    if (typeof rendered === 'string') {
      render(rendered)
    } else {
      rendered.then(render)
    }
  }
}
