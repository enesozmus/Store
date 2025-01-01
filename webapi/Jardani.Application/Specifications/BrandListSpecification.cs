using Jardani.Application.Specifications.Common;
using Jardani.Domain.Entities;

namespace Jardani.Application.Specifications;

public class BrandListSpecification : BaseSpecification<Product, string>
{
    public BrandListSpecification()
    {
        AddSelect(x => x.Brand);
        ApplyDistinct();
    }
}