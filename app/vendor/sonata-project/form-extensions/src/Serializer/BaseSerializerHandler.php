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

namespace Sonata\Form\Serializer;

use JMS\Serializer\Context;
use JMS\Serializer\GraphNavigator;
use JMS\Serializer\VisitorInterface;
use Sonata\Doctrine\Model\ManagerInterface;

/**
 * @author Sylvain Deloux <sylvain.deloux@ekino.com>
 */
abstract class BaseSerializerHandler implements SerializerHandlerInterface
{
    /**
     * @var ManagerInterface
     */
    protected $manager;

    /**
     * @var string[]
     */
    protected static $formats = [];

    public function __construct(ManagerInterface $manager)
    {
        $this->manager = $manager;
    }

    /**
     * @param string[] $formats
     */
    final public static function setFormats($formats)
    {
        static::$formats = $formats;
    }

    /**
     * @param string $format
     */
    final public static function addFormat($format)
    {
        static::$formats[] = $format;
    }

    /**
     * @return array[]
     */
    public static function getSubscribingMethods()
    {
        // NEXT_MAJOR : remove this block
        if (null === static::$formats) {
            static::$formats = ['json', 'xml', 'yml'];
            @trigger_error(sprintf(
                '%s::$formats has been set by default to array("json", "xml", "yml"). Ability to set them to a
                different value is deprecated since sonata-project/form-bundle 0.x and will be removed in version 1.0. Use "sonata_form.serializer.formats" configuration instead.',
                __CLASS__
            ), E_USER_DEPRECATED);
        }

        $type = static::getType();
        $methods = [];

        foreach (static::$formats as $format) {
            $methods[] = [
                'direction' => GraphNavigator::DIRECTION_SERIALIZATION,
                'format' => $format,
                'type' => $type,
                'method' => 'serializeObjectToId',
            ];

            $methods[] = [
                'direction' => GraphNavigator::DIRECTION_DESERIALIZATION,
                'format' => $format,
                'type' => $type,
                'method' => 'deserializeObjectFromId',
            ];
        }

        return $methods;
    }

    /**
     * Serialize data object to id.
     *
     * @param object $data
     *
     * @return int|null
     */
    public function serializeObjectToId(VisitorInterface $visitor, $data, array $type, Context $context)
    {
        $className = $this->manager->getClass();

        if ($data instanceof $className) {
            return $visitor->visitInteger($data->getId(), $type, $context);
        }

        return null;
    }

    /**
     * Deserialize object from its id.
     *
     * @param int $data
     *
     * @return object|null
     */
    public function deserializeObjectFromId(VisitorInterface $visitor, $data, array $type)
    {
        return $this->manager->findOneBy(['id' => $data]);
    }
}
