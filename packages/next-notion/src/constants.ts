import ms from 'ms'

/**
 * @question Why is `false|true|undefined` happening specifically?
 * @hack Is this occuring because of `api/v1/cms/index.ts`?
 * @hack Checking logs, we have some bots crashing the party
 *
 */
const nextWeirdRoutingSkipData = [
  'favicon.ico',
  'false',
  'true',
  'undefined',
  /**
   * @note This will grow slowly probably. 🤖️
   *       Keep checking logs for bots and add.
   *
   */
  '.env',
  '.git',
  '.kon.php',
  '1.php',
  '102.php',
  '1index.php',
  '2index.php',
  '302.php',
  '3index.php',
  '400.php',
  '404.php',
  '88.php',
  '_profiler/phpinfo',
  'a.php',
  'a7.php',
  'accesson0.php',
  'admin.php',
  'admin/index.php',
  'ads.txt',
  'alexus.php',
  'alfa.php',
  'app-ads.txt',
  'autoload_classmap.php',
  'bac',
  'backup',
  'bak',
  'bc',
  'bk',
  'c.php',
  'c99.php',
  'cache/accesson.php',
  'cache/accesson0.php',
  'cgi.php',
  'class-wp-widget-archives.php',
  'cms',
  'cms.php',
  'code.visualstudio.com',
  'contact.php',
  'cpanel.php',
  'data.php',
  'defau1t.php',
  'default.php',
  'demo',
  'dev',
  'dkiz.php',
  'doc.php',
  'e.php',
  'erby.php',
  'eventsz',
  'eventz',
  'exploit.php',
  'foundry.php',
  'fox.php',
  'foxwso.php',
  'fw.php',
  'haxor.php',
  'hehe.php',
  'index.php',
  'indox.php',
  // 'info',
  'info.php',
  'install',
  'install.php',
  'jindex.php',
  'leafmailer.php',
  'm.php',
  'magento_version',
  'mailer.php',
  'main',
  'mar.php',
  'marijuana.php', // lol, wut
  'media-admin.php',
  'mini.php',
  'mt',
  'mt/diz.php',
  'mt/mt-xmlrpc.cgi',
  'naz.php',
  'new',
  'new-site',
  'o.php',
  'old',
  'old-site',
  'old-wp',
  'oldsite',
  'p.php',
  'pekok.php',
  'phpinfo.php',
  'preload',
  'public/.env',
  'radio.php',
  'rsx.php',
  'sayangku.php',
  'send.php',
  'sh3ll.php',
  'shell.php',
  // 'shop',
  'shx.php',
  'sign-in',
  'site',
  'sitio',
  'small.php',
  'stindex.php',
  'storage',
  'storage/.env',
  'symlink.php',
  'takeout.php',
  'temp',
  'test',
  'test/test123',
  'tmp',
  'ups.php',
  'util/login.aspx',
  'v1',
  'v2',
  'vendor',
  'vendor/.env',
  'vuln.php',
  'web',
  'wi.php',
  'wikindex.php',
  'wordpress',
  'wp',
  'wp-admin',
  'wp-admin/install.php',
  'wp-admin/upload_index.php',
  'wp-blog.php',
]

/**
 * @redis is in seconds not ms
 */
const getTimeInSeconds = (time: number) => time / 1000 ?? 0

/**
 * @note in seconds
 *       ...probably could be hard-coded
 */
const TIME = {
  DAY: getTimeInSeconds(ms('1d')),
  HOUR: getTimeInSeconds(ms('1h')),
  MINUTE: getTimeInSeconds(ms('1m')),
  MONTH: getTimeInSeconds(ms('1m')),
  YEAR: getTimeInSeconds(ms('1y')),
}

// @note(next) no longer used due to ISR
const revalidate = TIME.DAY

const CACHE_TYPES = {
  REDIS: 'redis',
  JSON: 'json',
}

export { nextWeirdRoutingSkipData, revalidate, CACHE_TYPES, TIME }