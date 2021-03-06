<?php

declare(strict_types=1);

/*
 * This file is part of the Sonata Project package.
 *
 * (c) Thomas Rabaix <thomas.rabaix@sonata-project.org>
 *
 * For the full copyright and license information, please view the LICENSE
 * file that was distributed with this source code.
 */

namespace Sonata\Twig\Extension;

use Twig\Environment;
use Twig\Extensions\TextExtension;

/**
 * NEXT_MAJOR : remove this class and the twig/extensions dependency.
 *
 * @deprecated since sonata-project/twig-extensions 0.x, to be removed in 1.0.
 */
final class DeprecatedTextExtension extends TextExtension
{
    public function twig_truncate_filter(Environment $env, $value, $length = 30, $preserve = false, $separator = '...')
    {
        $this->notifyDeprecation();

        return twig_truncate_filter($env, $value, $length, $preserve, $separator);
    }

    public function twig_wordwrap_filter(Environment $env, $value, $length = 80, $separator = "\n", $preserve = false)
    {
        $this->notifyDeprecation();

        return twig_wordwrap_filter($env, $value, $length, $separator, $preserve);
    }

    private function notifyDeprecation()
    {
        @trigger_error(
            'Using the sonata.twig.deprecated_text_extension service is deprecated since 0.x and will be removed in 1.0',
            E_USER_DEPRECATED
        );
    }
}
