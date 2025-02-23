using Jardani.Application.Specifications.Common;
using Jardani.Domain.Entities;

namespace Jardani.Application.Specifications;

public class ColorListSpecification : BaseSpecification<Product, string>
{
    public ColorListSpecification()
    {
        AddSelect(x => x.Color);
        ApplyDistinct();
    }
}