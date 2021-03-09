<?php

namespace App\Application\Sonata\NewsBundle\Entity;

use Sonata\NewsBundle\Entity\BasePost as BasePost;

/**
 * This file has been generated by the SonataEasyExtendsBundle.
 *
 * @see https://sonata-project.org/easy-extends
 *
 * References:
 * @see http://www.doctrine-project.org/projects/orm/2.0/docs/reference/working-with-objects/en
 */
class Post extends BasePost
{
    /**
     * @var int
     */
    protected $id;

    /**
     * Get id.
     *
     * @return int $id
     */
    public function getId()
    {
        return $this->id;
    }
}
