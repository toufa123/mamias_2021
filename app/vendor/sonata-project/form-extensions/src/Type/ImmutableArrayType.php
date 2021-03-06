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

namespace Sonata\Form\Type;

use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

/**
 * @final since sonata-project/form-extensions 0.x
 */
class ImmutableArrayType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        foreach ($options['keys'] as $infos) {
            if ($infos instanceof FormBuilderInterface) {
                $builder->add($infos);
            } else {
                list($name, $type, $options) = $infos;

                if (\is_callable($options)) {
                    $extra = \array_slice($infos, 3);

                    $options = $options($builder, $name, $type, $extra);

                    if (null === $options) {
                        $options = [];
                    } elseif (!\is_array($options)) {
                        throw new \RuntimeException('the closure must return null or an array');
                    }
                }

                $builder->add($name, $type, $options);
            }
        }
    }

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'keys' => [],
        ]);

        $resolver->setAllowedValues('keys', static function ($value) {
            foreach ($value as $subValue) {
                if (!$subValue instanceof FormBuilderInterface && (!\is_array($subValue) || 3 !== \count($subValue))) {
                    return false;
                }
            }

            return true;
        });
    }

    /**
     * @return string
     */
    public function getBlockPrefix()
    {
        return 'sonata_type_immutable_array';
    }

    /**
     * @deprecated since 0.x to be removed in 1.x. Use getBlockPrefix() instead.
     *
     * @return string
     */
    public function getName()
    {
        return $this->getBlockPrefix();
    }
}
