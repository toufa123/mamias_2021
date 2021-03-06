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

namespace Sonata\Form\Validator;

use Sonata\CoreBundle\Validator\ErrorElement as DeprecatedErrorElement;
use Symfony\Component\DependencyInjection\ContainerInterface;
use Symfony\Component\Validator\Constraint;
use Symfony\Component\Validator\ConstraintValidator;
use Symfony\Component\Validator\ConstraintValidatorFactoryInterface;

/**
 * @final since sonata-project/form-extensions 0.x
 */
class InlineValidator extends ConstraintValidator
{
    /**
     * @var ContainerInterface
     */
    protected $container;

    /**
     * @var ConstraintValidatorFactoryInterface
     */
    protected $constraintValidatorFactory;

    public function __construct(
        ContainerInterface $container,
        ConstraintValidatorFactoryInterface $constraintValidatorFactory
    ) {
        $this->container = $container;
        $this->constraintValidatorFactory = $constraintValidatorFactory;
    }

    public function validate($value, Constraint $constraint)
    {
        if ($constraint->isClosure()) {
            $function = $constraint->getClosure();
        } else {
            if (\is_string($constraint->getService())) {
                $service = $this->container->get($constraint->getService());
            } else {
                $service = $constraint->getService();
            }

            $function = [$service, $constraint->getMethod()];
        }

        \call_user_func($function, $this->getErrorElement($value), $value);
    }

    /**
     * @param mixed $value
     *
     * @return ErrorElement
     */
    protected function getErrorElement($value)
    {
        if (class_exists(DeprecatedErrorElement::class)) {
            return new DeprecatedErrorElement(
                $value,
                $this->constraintValidatorFactory,
                $this->context,
                $this->context->getGroup()
            );
        }

        return new ErrorElement(
            $value,
            $this->constraintValidatorFactory,
            $this->context,
            $this->context->getGroup()
        );
    }
}
