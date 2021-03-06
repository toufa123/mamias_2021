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
use Symfony\Component\Form\Extension\Core\Type\DateTimeType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;
use Symfony\Component\Translation\TranslatorInterface as LegacyTranslatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class DateTimeRangeType extends AbstractType
{
    /**
     * NEXT_MAJOR: remove this property.
     *
     * @var LegacyTranslatorInterface|TranslatorInterface|null
     *
     * @deprecated translator property is deprecated since sonata-project/form-bundle 0.x, to be removed in 1.0
     */
    protected $translator;

    /**
     * NEXT_MAJOR: remove this method.
     *
     * @deprecated translator dependency is deprecated since sonata-project/core-bundle 0.x, to be removed in 1.0
     */
    public function __construct($translator = null)
    {
        if (
            !$translator instanceof LegacyTranslatorInterface &&
            !$translator instanceof TranslatorInterface &&
            null !== $translator
        ) {
            throw new \InvalidArgumentException(sprintf(
                'Argument 2 should be an instance of %s or %s',
                LegacyTranslatorInterface::class,
                TranslatorInterface::class
            ));
        }

        // check if class is overloaded and notify about removing deprecated translator
        if (null !== $translator && __CLASS__ !== static::class && DateTimeRangePickerType::class !== static::class) {
            @trigger_error(
                'The translator dependency in '.__CLASS__.' is deprecated since 0.x and will be removed in 1.0. '.
                'Please prepare your dependencies for this change.',
                E_USER_DEPRECATED
            );
        }

        $this->translator = $translator;
    }

    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $options['field_options_start'] = array_merge(
            [
                'label' => 'date_range_start',
                'translation_domain' => 'SonataCoreBundle',
            ],
            $options['field_options_start']
        );

        $options['field_options_end'] = array_merge(
            [
                'label' => 'date_range_end',
                'translation_domain' => 'SonataCoreBundle',
            ],
            $options['field_options_end']
        );

        $builder->add('start', $options['field_type'], array_merge(['required' => false], $options['field_options'], $options['field_options_start']));
        $builder->add('end', $options['field_type'], array_merge(['required' => false], $options['field_options'], $options['field_options_end']));
    }

    /**
     * @return string
     */
    public function getBlockPrefix()
    {
        return 'sonata_type_datetime_range';
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

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults([
            'field_options' => [],
            'field_options_start' => [],
            'field_options_end' => [],
            'field_type' => DateTimeType::class,
        ]);
    }
}
