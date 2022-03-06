import { NextApiResponse } from 'next'
import { getStaticPropsCatchAll } from 'next-notion/src/getStaticPropsCatchAll'
import { getNotion } from 'next-notion/src/helper'
import { getKeysByJoin } from 'next-notion/src/utils'

import { notionConfig } from '~config/index'

const notion = getNotion(notionConfig)

const { PAGES__HOMEPAGE } = notionConfig

const cache = process.env.NEXT_PUBLIC__NOTION_USE_CACHE === 'true' ? true : false
const isBuildStep = process.env.CI
const isDev = process.env.NODE_ENV === 'development'

const debugType = (cache && isBuildStep) || isDev ? 'cache' : 'api'

const notionCatchAll = async (req: any, res: NextApiResponse) => {
  try {
    // @todo(next) preview
    const preview = req.query?.preview || false
    const clear = req.query?.clear || false
    const catchAll = [PAGES__HOMEPAGE]
    const key = getKeysByJoin({
      keyData: catchAll,
      keyPrefix: 'notion',
    })

    // http://localhost:3000/api/v1/cms/blog/2020/12/28/preview-blog-post?preview=true
    const pathVariables = notion.custom.getPathVariables({
      catchAll,
    })

    const start = Date.now()
    const data = await getStaticPropsCatchAll({
      catchAll,
      clear,
      notionConfig,
      pathVariables,
      preview,
    })
    const debug = {
      key,
      latency: Date.now() - start,
      type: debugType,
    }

    res.status(200).json({ ...data, debug })
  } catch (e) {
    // eslint-disable-next-line no-console
    console.log(e)

    return res.status(500).json({
      error: {
        code: 'server_error',
        message: 'Internal server error',
      },
    })
  }
}

export default notionCatchAll
