<?php

declare(strict_types=1);

namespace PackageVersions;

use Composer\InstalledVersions;
use OutOfBoundsException;

class_exists(InstalledVersions::class);

/**
 * This class is generated by composer/package-versions-deprecated, specifically by
 * @see \PackageVersions\Installer
 *
 * This file is overwritten at every run of `composer install` or `composer update`.
 *
 * @deprecated in favor of the Composer\InstalledVersions class provided by Composer 2. Require composer-runtime-api:^2 to ensure it is present.
 */
final class Versions
{
    /**
     * @deprecated please use {@see self::rootPackageName()} instead.
     *             This constant will be removed in version 2.0.0.
     */
    const ROOT_PACKAGE_NAME = 'mamias/2020';

    /**
     * Array of all available composer packages.
     * Dont read this array from your calling code, but use the \PackageVersions\Versions::getVersion() method instead.
     *
     * @var array<string, string>
     * @internal
     */
    const VERSIONS          = array (
  'api-platform/api-pack' => 'v1.3.0@0fb12343362f565b65eb374d3c49bec580ffcf8d',
  'api-platform/core' => 'v2.6.4@be971e5d0257a8c01a824ee01cfc217ba04c3200',
  'behat/transliterator' => 'v1.3.0@3c4ec1d77c3d05caa1f0bf8fb3aae4845005c7fc',
  'cocur/slugify' => 'v4.0.0@3f1ffc300f164f23abe8b64ffb3f92d35cec8307',
  'composer/package-versions-deprecated' => '1.11.99.1@7413f0b55a051e89485c5cb9f765fe24bb02a7b6',
  'connectholland/cookie-consent-bundle' => '0.9.6@e370861c4e0f7db2964e91d214b88f3b98ee9be3',
  'creof/doctrine2-spatial' => 'dev-master@6c3763882f7a7091bf17b4ded6c68c3faba9a03b',
  'creof/geo-parser' => '2.2.1@b55553a54c7775576c9ee629847973d0b6d7cbed',
  'creof/wkb-parser' => 'v2.3.0@1ddb69da8cc90607dd528fd9992ef1fc10cc8839',
  'creof/wkt-parser' => '2.2.0@bc4c051b7a4e99b4943e2ec358218ed200aa991e',
  'doctrine/annotations' => '1.12.1@b17c5014ef81d212ac539f07a1001832df1b6d3b',
  'doctrine/cache' => '1.11.0@a9c1b59eba5a08ca2770a76eddb88922f504e8e0',
  'doctrine/collections' => '1.6.7@55f8b799269a1a472457bd1a41b4f379d4cfba4a',
  'doctrine/common' => '2.13.3@f3812c026e557892c34ef37f6ab808a6b567da7f',
  'doctrine/dbal' => '2.13.1@c800380457948e65bbd30ba92cc17cda108bf8c9',
  'doctrine/deprecations' => 'v0.5.3@9504165960a1f83cc1480e2be1dd0a0478561314',
  'doctrine/doctrine-bundle' => '1.12.13@85460b85edd8f61a16ad311e7ffc5d255d3c937c',
  'doctrine/doctrine-cache-bundle' => '1.4.0@6bee2f9b339847e8a984427353670bad4e7bdccb',
  'doctrine/doctrine-migrations-bundle' => '3.0.1@96e730b0ffa0bb39c0f913c1966213f1674bf249',
  'doctrine/event-manager' => '1.1.1@41370af6a30faa9dc0368c4a6814d596e81aba7f',
  'doctrine/inflector' => '1.4.4@4bd5c1cdfcd00e9e2d8c484f79150f67e5d355d9',
  'doctrine/instantiator' => '1.4.0@d56bf6102915de5702778fe20f2de3b2fe570b5b',
  'doctrine/lexer' => '1.2.1@e864bbf5904cb8f5bb334f99209b48018522f042',
  'doctrine/migrations' => '3.1.2@1c2780df6b58998f411e64973cfa464ba0a06e00',
  'doctrine/orm' => 'v2.6.6@2d9b9351831d1230881c52f006011cbf72fe944e',
  'doctrine/persistence' => '1.3.8@7a6eac9fb6f61bba91328f15aa7547f4806ca288',
  'doctrine/reflection' => '1.2.2@fa587178be682efe90d005e3a322590d6ebb59a5',
  'egulias/email-validator' => '2.1.25@0dbf5d78455d4d6a41d186da50adc1122ec066f4',
  'excelwebzone/recaptcha-bundle' => 'v1.5.27@239074c779723510a8da2dad16382dee5a6b6e93',
  'ezyang/htmlpurifier' => 'v4.13.0@08e27c97e4c6ed02f37c5b2b20488046c8d90d75',
  'fig/link-util' => '1.1.2@5d7b8d04ed3393b4b59968ca1e906fb7186d81e8',
  'friendsofphp/proxy-manager-lts' => 'v1.0.3@121af47c9aee9c03031bdeca3fac0540f59aa5c3',
  'friendsofsymfony/ckeditor-bundle' => '2.3.0@282c79b0d3eda68855ea4c8732ab8d249cd5fbd0',
  'friendsofsymfony/user-bundle' => 'v2.1.2@1049935edd24ec305cc6cfde1875372fa9600446',
  'gedmo/doctrine-extensions' => 'v3.0.5@f956c3c4d0c0ffdc5dd879288073772e439b6c1a',
  'google/recaptcha' => '1.2.4@614f25a9038be4f3f2da7cbfd778dc5b357d2419',
  'guzzlehttp/guzzle' => '6.5.5@9d4290de1cfd701f38099ef7e183b64b4b7b0c5e',
  'guzzlehttp/promises' => '1.4.1@8e7d04f1f6450fef59366c399cfad4b9383aa30d',
  'guzzlehttp/psr7' => '1.8.2@dc960a912984efb74d0a90222870c72c87f10c91',
  'helios-ag/fm-elfinder-bundle' => '10.1@0c35db5ae1d758baf6970765456f87aec3de347b',
  'imagine/imagine' => '1.2.4@d2e18be6e930ca169e4f921ef73ebfc061bf55d8',
  'jdorn/sql-formatter' => 'v1.2.17@64990d96e0959dff8e059dfcdc1af130728d92bc',
  'jms/metadata' => '2.5.0@b5c52549807b2d855b3d7e36ec164c00eb547338',
  'jms/serializer' => '3.12.3@f908d17afd08f0aab9c083322022682b41483c5b',
  'jms/serializer-bundle' => '3.9.1@2fbf2385668dd715d030567fd41e181bbf41fb42',
  'jsor/doctrine-postgis' => 'v1.7.0@a656156dd3b730a2d46cbcb6270e7124cbf62786',
  'knplabs/gaufrette' => 'v0.9.0@786247eba04d4693e88a80ca9fdabb634675dcac',
  'knplabs/knp-markdown-bundle' => '1.9.0@843b3d0c9b741a3cf46296e9f326026b210e66c1',
  'knplabs/knp-menu' => 'v3.1.3@bee33a4cb6b698447cd61c6b593589a82993f8c9',
  'knplabs/knp-menu-bundle' => 'v3.1.0@2b4c3bcba1646aef17b5e368f3004b108330c59b',
  'kriswallsmith/buzz' => 'v0.16.1@4977b7d44dbef49cdc641f14be6512fdcfe32f12',
  'laminas/laminas-code' => '4.3.0@1beb4447f9efd26041eba7eff50614e798c353fd',
  'laminas/laminas-eventmanager' => '3.3.1@966c859b67867b179fde1eff0cd38df51472ce4a',
  'laminas/laminas-json' => '3.2.0@1e3b64d3b21dac0511e628ae8debc81002d14e3c',
  'laminas/laminas-zendframework-bridge' => '1.2.0@6cccbddfcfc742eb02158d6137ca5687d92cee32',
  'liip/imagine-bundle' => '2.6.0@afa4193c7fde027426ebb19e73878cd026438bbd',
  'maennchen/zipstream-php' => '2.1.0@c4c5803cc1f93df3d2448478ef79394a5981cc58',
  'markbaker/complex' => '2.0.0@9999f1432fae467bc93c53f357105b4c31bb994c',
  'markbaker/matrix' => '2.1.2@361c0f545c3172ee26c3d596a0aa03f0cef65e6a',
  'mhujer/breadcrumbs-bundle' => '1.5.3@4164b18473a9b30b4f1dc6e2a44e81b2345527ba',
  'michelf/php-markdown' => '1.9.0@c83178d49e372ca967d1a8c77ae4e051b3a3c75c',
  'monolog/monolog' => '1.26.0@2209ddd84e7ef1256b7af205d0717fb62cfc9c33',
  'myclabs/php-enum' => '1.8.0@46cf3d8498b095bd33727b13fd5707263af99421',
  'nelmio/cors-bundle' => '2.1.1@0b964b665016dfb61dd0fd2bb8c24afb1ae45a93',
  'ob/highcharts-bundle' => '1.7@7faa0a48aa8255ff047b2ff76ead6222bfffc2da',
  'orbitale/cms-bundle' => 'v3.1.1@d1a75fa4f6a1d21b9de17cd5326145f7ee4e7fce',
  'phpdocumentor/reflection-common' => '2.2.0@1d01c49d4ed62f25aa84a747ad35d5a16924662b',
  'phpdocumentor/reflection-docblock' => '5.2.2@069a785b2141f5bcf49f3e353548dc1cce6df556',
  'phpdocumentor/type-resolver' => '1.4.0@6a467b8989322d92aa1c8bf2bebcc6e5c2ba55c0',
  'phpoffice/phpspreadsheet' => '1.17.1@c55269cb06911575a126dc225a05c0e4626e5fb4',
  'phpstan/phpdoc-parser' => '0.5.4@e352d065af1ae9b41c12d1dfd309e90f7b1f55c9',
  'picoss/sonata-extra-admin-bundle' => '4.0@2b62f84c4ad5559b62d2e7bf4adda6ac1ca13f67',
  'presta/sitemap-bundle' => 'v2.5.0@fb83304ce365699b879cf7e998f1d5bbec8ddb27',
  'psr/cache' => '1.0.1@d11b50ad223250cf17b86e38383413f5a6764bf8',
  'psr/container' => '1.1.1@8622567409010282b7aeebe4bb841fe98b58dcaf',
  'psr/http-client' => '1.0.1@2dfb5f6c5eff0e91e20e913f8c5452ed95b86621',
  'psr/http-factory' => '1.0.1@12ac7fcd07e5b077433f5f2bee95b3a771bf61be',
  'psr/http-message' => '1.0.1@f6561bf28d520154e4b0ec72be95418abe6d9363',
  'psr/link' => '1.0.0@eea8e8662d5cd3ae4517c9b864493f59fca95562',
  'psr/log' => '1.1.4@d49695b909c3b7628b6289db5479a1c204601f11',
  'psr/simple-cache' => '1.0.1@408d5eafb83c57f6365a3ca330ff23aa4a5fa39b',
  'pugx/autocompleter-bundle' => 'v1.7.0@90eaf2c52502e6701e620fdef905154f8507ebe8',
  'ralouphie/getallheaders' => '3.0.3@120b605dfeb996808c31b6477290a714d356e822',
  'redcode/tree-bundle' => '0.1-alpha@430eee919979d8b0f4b5fa1445b8ee0f9ba99fc2',
  'rollerworks/password-strength-bundle' => 'v2.2.0@673021055a76d85a2817f4732a4d5feae0b4b4fb',
  'rollerworks/password-strength-validator' => 'v1.3.3@9c3dde3ca652ad29c11bbf1293a5f6121f9606ba',
  'sensio/framework-extra-bundle' => 'v5.6.1@430d14c01836b77c28092883d195a43ce413ee32',
  'sonata-project/admin-bundle' => '3.99.1@cbed621afb26ee26809dc4f502b38c89b01d21d8',
  'sonata-project/block-bundle' => '3.21.0@d78985b743dbe4f1ea2b5bd94090cf89e14ac3c0',
  'sonata-project/cache' => '1.1.1@0d2849ccb08a74cc9eed34820e5bb1486e56c4b0',
  'sonata-project/cache-bundle' => '2.4.2@359f9afcc909e61b3766e66700e112528c699b8a',
  'sonata-project/classification-bundle' => '3.13.2@3fc030b8b0e8efc5bbd37e8e5884da7c1aed5f2a',
  'sonata-project/core-bundle' => '3.20.0@3979caf03680d1fbf8f4bc53f96ee0e0496ab972',
  'sonata-project/datagrid-bundle' => '2.5.0@3d67da1be314130c8b419a881582c93bedf809fa',
  'sonata-project/doctrine-extensions' => '1.9.1@935869d748b77241ee0a4614a8f44c5da1bb0830',
  'sonata-project/doctrine-orm-admin-bundle' => '3.29.0@6df5cec1ceb029132e5690c368623ab712bf8041',
  'sonata-project/easy-extends-bundle' => '2.5.0@c62fb4f7e74f7fc5f32f122ffa8131d7cf05a1db',
  'sonata-project/exporter' => '2.6.2@ac62024a6d4d3ddff8da98d43119a0f3ec1ef59a',
  'sonata-project/form-extensions' => '0.1.2@d8bc00913d2b63ee39a25f668a912c59d68f3732',
  'sonata-project/formatter-bundle' => '4.3.0@679dc398d47eb9f1e8292a3d5c8c42a71a074c51',
  'sonata-project/intl-bundle' => '2.10.1@d058c42e852099813431775713dc68223fed88a0',
  'sonata-project/media-bundle' => '3.28.0@99dcae1bd84e20ba35b70ceb0c19697246c55081',
  'sonata-project/news-bundle' => '3.15.0@3d7c49ebdf20758a5d22ae67633c1f1ac5e26a8a',
  'sonata-project/translation-bundle' => '2.4.2@b9e66dbe65db28747146b01da6187a233a81a8f5',
  'sonata-project/twig-extensions' => '0.1.1@b18a216163265f038f7eb8534fb3771981e04975',
  'sonata-project/user-bundle' => '4.5.3@05f20722273fc1688ec298b5221f3e95430f09e9',
  'stof/doctrine-extensions-bundle' => 'v1.5.0@c01e73e49cee5eac3353b6c4ebdbb0a151348c85',
  'studio-42/elfinder' => '2.1.57@087524b1d7a4d76cfd848dee2093cd8daf987f78',
  'swiftmailer/swiftmailer' => 'v6.2.7@15f7faf8508e04471f666633addacf54c0ab5933',
  'symfony/asset' => 'v4.4.20@f2204a526c34945b1614cde033692983b6102eb8',
  'symfony/cache' => 'v4.4.20@8fa248b0105d962ac279ae973dee2a32ae009dee',
  'symfony/cache-contracts' => 'v2.4.0@c0446463729b89dd4fa62e9aeecc80287323615d',
  'symfony/config' => 'v4.4.20@98606c6fa1a8f55ff964ccdd704275bf5b9f71b3',
  'symfony/console' => 'v4.4.20@c98349bda966c70d6c08b4cd8658377c94166492',
  'symfony/debug' => 'v4.4.20@157bbec4fd773bae53c5483c50951a5530a2cc16',
  'symfony/dependency-injection' => 'v4.4.20@4b3e341ce4436df9a9abc2914cb120b4d41796d7',
  'symfony/doctrine-bridge' => 'v4.4.20@4ac8549aa5edb33f650a7c0cc293f233b6fe9f1f',
  'symfony/error-handler' => 'v4.4.20@a191550d46b73a527b9d244f185fef439d41cf15',
  'symfony/event-dispatcher' => 'v4.4.20@c352647244bd376bf7d31efbd5401f13f50dad0c',
  'symfony/event-dispatcher-contracts' => 'v1.1.9@84e23fdcd2517bf37aecbd16967e83f0caee25a7',
  'symfony/expression-language' => 'v4.4.20@a6b2c711e4d4dcba4db7b36a8a1835b0720d07fe',
  'symfony/filesystem' => 'v4.4.20@715e7a531bdae109a828f9e91629e5b3b2926beb',
  'symfony/finder' => 'v4.4.20@2543795ab1570df588b9bbd31e1a2bd7037b94f6',
  'symfony/flex' => 'v1.12.2@e472606b4b3173564f0edbca8f5d32b52fc4f2c9',
  'symfony/form' => 'v4.4.20@25a65942f1245f0e85510ddeb62ad84dacadc338',
  'symfony/framework-bundle' => 'v4.4.20@5b5aefc0542e2b42f6f3b9b90d6ef2ff75fee19a',
  'symfony/http-client' => 'v4.4.20@67c5af7489b3c2eea771abd973243f5c58f5fb40',
  'symfony/http-client-contracts' => 'v2.4.0@7e82f6084d7cae521a75ef2cb5c9457bbda785f4',
  'symfony/http-foundation' => 'v4.4.20@02d968647fe61b2f419a8dc70c468a9d30a48d3a',
  'symfony/http-kernel' => 'v4.4.20@4f36548465489f293b05406f1770492f6efb8adb',
  'symfony/inflector' => 'v4.4.20@a8691d012fb449ba49363a3b3e3e743f354f7d56',
  'symfony/intl' => 'v4.4.20@fe19cafd0ff661c2143c8717bb1dca0457794c1e',
  'symfony/mailer' => 'v4.4.20@df3209aaa4008b9bb851410ab31be12d9b744773',
  'symfony/mime' => 'v4.4.20@6db092f97cd6eee8d4b2026e3a8fa3f576b396d4',
  'symfony/monolog-bridge' => 'v4.4.20@47343492b1841db765de8d55b4b5ccaa1c96edd3',
  'symfony/monolog-bundle' => 'v3.7.0@4054b2e940a25195ae15f0a49ab0c51718922eb4',
  'symfony/options-resolver' => 'v4.4.20@cd8c6a2778d5f8b5e8fc4b7abdf126790b5d5095',
  'symfony/orm-pack' => 'v2.1.0@357f6362067b1ebb94af321b79f8939fc9118751',
  'symfony/polyfill-intl-grapheme' => 'v1.22.1@5601e09b69f26c1828b13b6bb87cb07cddba3170',
  'symfony/polyfill-intl-icu' => 'v1.22.1@af1842919c7e7364aaaa2798b29839e3ba168588',
  'symfony/polyfill-intl-idn' => 'v1.22.1@2d63434d922daf7da8dd863e7907e67ee3031483',
  'symfony/polyfill-intl-normalizer' => 'v1.22.1@43a0283138253ed1d48d352ab6d0bdb3f809f248',
  'symfony/polyfill-mbstring' => 'v1.22.1@5232de97ee3b75b0360528dae24e73db49566ab1',
  'symfony/polyfill-php72' => 'v1.22.1@cc6e6f9b39fe8075b3dabfbaf5b5f645ae1340c9',
  'symfony/polyfill-php73' => 'v1.22.1@a678b42e92f86eca04b7fa4c0f6f19d097fb69e2',
  'symfony/polyfill-php80' => 'v1.22.1@dc3063ba22c2a1fd2f45ed856374d79114998f91',
  'symfony/process' => 'v4.4.20@7e950b6366d4da90292c2e7fa820b3c1842b965a',
  'symfony/property-access' => 'v4.4.20@94a1d9837396c71a0d8c31686c16693a15651622',
  'symfony/property-info' => 'v4.4.20@67845c335482cea0dd52497ae1314ce7a4978c74',
  'symfony/proxy-manager-bridge' => 'v4.4.20@811a39770b21f05bea9a737568074be4f02e7733',
  'symfony/routing' => 'v4.4.20@69919991c845b34626664ddc9b3aef9d09d2a5df',
  'symfony/security-acl' => 'v3.1.2@3090d19879577c2993314c68a2cf6c5723744049',
  'symfony/security-bundle' => 'v4.4.20@55a84ceb5f68e2dc836708e51f1ce1e5f7cecb7b',
  'symfony/security-core' => 'v4.4.20@e185d3918539a9a7c794c20baa18f5e0333a826d',
  'symfony/security-csrf' => 'v4.4.20@6864087a9c20eb4bb4063fc2f36954cec0ce28a6',
  'symfony/security-guard' => 'v4.4.20@20f522ada1eefb7c2f90cb83dcc76abb160c782f',
  'symfony/security-http' => 'v4.4.20@1a69306ec4185de37df2350cf3d6a529b14b21f0',
  'symfony/serializer' => 'v4.4.20@9fa36329a06282e1fc856b84f645472a410c3922',
  'symfony/serializer-pack' => 'v1.0.4@61173947057d5e1bf1c79e2a6ab6a8430be0602e',
  'symfony/service-contracts' => 'v2.4.0@f040a30e04b57fbcc9c6cbcf4dbaa96bd318b9bb',
  'symfony/stopwatch' => 'v4.4.20@c5572f6494fc20668a73b77684d8dc77e534d8cf',
  'symfony/string' => 'v5.2.8@01b35eb64cac8467c3f94cd0ce2d0d376bb7d1db',
  'symfony/swiftmailer-bundle' => 'v3.4.0@553d2474288349faed873da8ab7c1551a00d26ae',
  'symfony/templating' => 'v4.4.20@de52205770c4884be1ac54d5b222d4d62b073dc8',
  'symfony/translation' => 'v4.4.20@2271b6d577018a7dea75a9162a08ac84f8234deb',
  'symfony/translation-contracts' => 'v2.4.0@95c812666f3e91db75385749fe219c5e494c7f95',
  'symfony/twig-bridge' => 'v4.4.20@e18a7f7b7062ef9ff92b9286955c5c8f9ce1f4e9',
  'symfony/twig-bundle' => 'v4.4.20@7cee73b45e3bd963a0ab4184f1041dcdc85b6e86',
  'symfony/validator' => 'v4.4.20@08c3add0462f22f00b856c0d0361cf51897d51aa',
  'symfony/var-dumper' => 'v4.4.4@46b53fd714568af343953c039ff47b67ce8af8d6',
  'symfony/var-exporter' => 'v4.4.20@3a3ea598bba6901d20b58c2579f68700089244ed',
  'symfony/web-link' => 'v4.4.20@b8d46e59e3d430691908e0f20467e6933b36a2b5',
  'symfony/yaml' => 'v4.4.20@29e61305e1c79d25f71060903982ead8f533e267',
  'thormeier/breadcrumb-bundle' => '2.2.1@459fa535dc4d48e36deb6a6c3dbc43efb71be656',
  'twig/extensions' => 'v1.5.4@57873c8b0c1be51caa47df2cdb824490beb16202',
  'twig/string-extra' => 'v3.3.1@b98a7cee2a44cf69c88a978834394bd17b694957',
  'twig/twig' => 'v2.14.5@c9dd15b3a80725bc4919730fae462bddcc960820',
  'vich/uploader-bundle' => '1.11.0@8ef4935f5535bb4e967f30ee95dff358c7c0705e',
  'webmozart/assert' => '1.10.0@6964c76c7804814a842473e0c8fd15bab0f18e25',
  'willdurand/negotiation' => '3.0.0@04e14f38d4edfcc974114a07d2777d90c98f3d9c',
  'composer/semver' => '3.2.4@a02fdf930a3c1c3ed3a49b5f63859c0c20e10464',
  'composer/xdebug-handler' => '2.0.1@964adcdd3a28bf9ed5d9ac6450064e0d71ed7496',
  'friendsofphp/php-cs-fixer' => 'v2.19.0@d5b8a9d852b292c2f8a035200fa6844b1f82300b',
  'nikic/php-parser' => 'v4.10.5@4432ba399e47c66624bc73c8c0f811e5c109576f',
  'pdepend/pdepend' => '2.9.1@1632f0cee84512ffd6dde71e58536b3b06528c41',
  'php-cs-fixer/diff' => 'v1.3.1@dbd31aeb251639ac0b9e7e29405c1441907f5759',
  'phpmd/phpmd' => '2.10.1@bd5ef43d1dcaf7272605027c959c1c5ff3761f7a',
  'phpstan/extension-installer' => '1.1.0@66c7adc9dfa38b6b5838a9fb728b68a7d8348051',
  'phpstan/phpstan' => '0.12.87@d464e00776afb711f419faffa96826dc02e4d145',
  'squizlabs/php_codesniffer' => '3.6.0@ffced0d2c8fa8e6cdc4d695a743271fab6c38625',
  'symfony/browser-kit' => 'v4.4.20@cfa8d92f95294747e3abc04969efee51ed374424',
  'symfony/css-selector' => 'v4.4.20@f907d3e53ecb2a5fad8609eb2f30525287a734c8',
  'symfony/debug-bundle' => 'v4.4.20@1e136a4c6d8c2364b77e31c5bf124660cff6d084',
  'symfony/debug-pack' => 'v1.0.9@cfd5093378e9cafe500f05c777a22fe8a64a9342',
  'symfony/deprecation-contracts' => 'v2.4.0@5f38c8804a9e97d23e0c8d63341088cd8a22d627',
  'symfony/dom-crawler' => 'v4.4.20@be133557f1b0e6672367325b508e65da5513a311',
  'symfony/dotenv' => 'v4.4.20@4952e5ce9e6df3d737b9e9c337bddf781180a213',
  'symfony/maker-bundle' => 'v1.31.1@4f57a44cef0b4555043160b8bf223fcde8a7a59a',
  'symfony/phpunit-bridge' => 'v5.2.8@b3cf2c3f7f6196fb498002920c1ae9036d9e5619',
  'symfony/profiler-pack' => 'v1.0.5@29ec66471082b4eb068db11eb4f0a48c277653f7',
  'symfony/test-pack' => 'v1.0.7@e61756c97cbedae00b7cf43b87abcfadfeb2746c',
  'symfony/web-profiler-bundle' => 'v4.4.20@2a5eeaa950e5702738437c6c8f442eca46ffc0c5',
  'paragonie/random_compat' => '2.*@f7f613e013d0076c01ca30423995b7586181569c',
  'symfony/polyfill-ctype' => '*@f7f613e013d0076c01ca30423995b7586181569c',
  'symfony/polyfill-iconv' => '*@f7f613e013d0076c01ca30423995b7586181569c',
  'symfony/polyfill-php71' => '*@f7f613e013d0076c01ca30423995b7586181569c',
  'symfony/polyfill-php70' => '*@f7f613e013d0076c01ca30423995b7586181569c',
  'symfony/polyfill-php56' => '*@f7f613e013d0076c01ca30423995b7586181569c',
  'mamias/2020' => 'dev-main@f7f613e013d0076c01ca30423995b7586181569c',
);

    private function __construct()
    {
    }

    /**
     * @psalm-pure
     *
     * @psalm-suppress ImpureMethodCall we know that {@see InstalledVersions} interaction does not
     *                                  cause any side effects here.
     */
    public static function rootPackageName() : string
    {
        if (!class_exists(InstalledVersions::class, false) || !InstalledVersions::getRawData()) {
            return self::ROOT_PACKAGE_NAME;
        }

        return InstalledVersions::getRootPackage()['name'];
    }

    /**
     * @throws OutOfBoundsException If a version cannot be located.
     *
     * @psalm-param key-of<self::VERSIONS> $packageName
     * @psalm-pure
     *
     * @psalm-suppress ImpureMethodCall we know that {@see InstalledVersions} interaction does not
     *                                  cause any side effects here.
     */
    public static function getVersion(string $packageName): string
    {
        if (class_exists(InstalledVersions::class, false) && InstalledVersions::getRawData()) {
            return InstalledVersions::getPrettyVersion($packageName)
                . '@' . InstalledVersions::getReference($packageName);
        }

        if (isset(self::VERSIONS[$packageName])) {
            return self::VERSIONS[$packageName];
        }

        throw new OutOfBoundsException(
            'Required package "' . $packageName . '" is not installed: check your ./vendor/composer/installed.json and/or ./composer.lock files'
        );
    }
}
