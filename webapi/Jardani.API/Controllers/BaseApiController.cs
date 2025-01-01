using Jardani.API.RequestHelpers;
using Jardani.Application.IRepositories;
using Jardani.Application.Specifications.Common;
using Jardani.Domain.Entities;
using Microsoft.AspNetCore.Mvc;

namespace Jardani.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class BaseApiController : ControllerBase
{
    // protected async Task<ActionResult> CreatePagedResult<T>(IGenericRepository<T> repo, ISpecification<T> spec, int pageIndex, int pageSize) where T : BaseEntity
    protected async Task<ActionResult> CreatePagedResult<T>(IReadRepository<T> repo, ISpecification<T> spec, int pageIndex, int pageSize) where T : BaseEntity
    {
        var items = await repo.GetListAsyncWithSpec(spec);
        var count = await repo.CountAsyncWithSpec(spec);

        var pagination = new Pagination<T>(pageIndex, pageSize, count, items);

        return Ok(pagination);
    }
}