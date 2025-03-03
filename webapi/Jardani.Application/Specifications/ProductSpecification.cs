using Jardani.Application.Specifications.Common;
using Jardani.Application.Specifications.Params;
using Jardani.Domain.Entities;

namespace Jardani.Application.Specifications;

public class ProductSpecification : BaseSpecification<Product>
{
    public ProductSpecification(ProductSpecParams specParams) : base(x =>
        (string.IsNullOrEmpty(specParams.Search) || x.Name.ToLower().Contains(specParams.Search))
        &&
        (specParams.Brands.Count == 0 || specParams.Brands.Contains(x.Brand))
        &&
        (specParams.Colors.Count == 0 || specParams.Colors.Contains(x.Color))
        &&
        (specParams.Types.Count == 0 || specParams.Types.Contains(x.Type))
    )
    {
        ApplyPaging(specParams.PageSize * (specParams.PageIndex - 1), specParams.PageSize);

        switch (specParams.Sort)
        {
            case "priceAsc":
                AddOrderBy(x => x.Price);
                break;
            case "priceDesc":
                AddOrderByDescending(x => x.Price);
                break;
            case "orderByName":
                AddOrderBy(x => x.Name);
                break;
            default:
                break;
        }
    }
}