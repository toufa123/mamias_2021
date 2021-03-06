<?php

namespace App\Entity;

use Doctrine\ORM\Mapping as ORM;
use Orbitale\Bundle\CmsBundle\Entity\Category as BaseCategory;

/**
 * @ORM\Entity(repositoryClass="Orbitale\Bundle\CmsBundle\Repository\CategoryRepository")
 * @ORM\Table(name="orbitale_cms_categories")
 */
class Category extends BaseCategory
{
    /**
     * @var int
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    protected $id;

    public function getId(): ?int
    {
        return $this->id;
    }
}
