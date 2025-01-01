using Jardani.Application.Specifications.Common;
using Jardani.Domain.Entities;

namespace Jardani.Application.Specifications;

public class TypeListSpecification : BaseSpecification<Product, string>
{
    public TypeListSpecification()
    {
        AddSelect(x => x.Type);
        ApplyDistinct();
    }
}