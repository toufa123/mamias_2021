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

use Twig\Extension\AbstractExtension;
use Twig\Extension\GlobalsInterface;

/**
 * @final since sonata-project/twig-extensions 0.x
 */
class FormTypeExtension extends AbstractExtension implements GlobalsInterface
{
    /**
     * @var bool
     */
    private $wrapFieldsWithAddons;

    public function __construct($formType)
    {
        $this->wrapFieldsWithAddons = (true === $formType || 'standard' === $formType);
    }

    public function getGlobals(): array
    {
        return [
            'wrap_fields_with_addons' => $this->wrapFieldsWithAddons,
        ];
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'sonata_twig_wrapping';
    }
}
