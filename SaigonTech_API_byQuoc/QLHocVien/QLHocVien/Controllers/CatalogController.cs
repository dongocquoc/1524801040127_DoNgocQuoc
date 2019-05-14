using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHocVien.Models;
using QLHocVien.Models.Response;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHocVien.Controllers
{
    [Route("api/[controller]")]

    [ApiController]
    public class CatalogController : Controller
    {
        private readonly QLHocVienContext _context;
        public CatalogController(QLHocVienContext context)
        {
            _context = context;
        }

        [HttpGet]
        public async Task<ActionResult<BaseResponse>> Get()
        {
            var datas = await _context.Catalogs.ToListAsync();
            if (datas != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Load dữ liệu thành công!!",
                    Data = datas
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Không có dữ liệu"
                };
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> Get(int id)
        {
            var CatalogItem = await _context.Catalogs.FindAsync(id);

            if (CatalogItem != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = new Catalog()
                    {
                        Id = CatalogItem.Id,
                        BeginYear = CatalogItem.BeginYear,
                        EndYear = CatalogItem.EndYear
                    }
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Không tìm thấy!!"
                };
            }
        }

        [HttpPost]
        public async Task<ActionResult<BaseResponse>> Post(Catalog CatalogItem)
        {
            var datas = _context.Catalogs.Where(x => x.BeginYear.Equals(Convert.ToInt32(CatalogItem.BeginYear))).Where(y => y.EndYear.Equals(Convert.ToInt32(CatalogItem.EndYear))).ToList();
            if(datas.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 2,
                    Messege = "Catalog already exists. Please check again!!"
                };
            }
            else if((Convert.ToInt32(CatalogItem.BeginYear)) == 0 || (Convert.ToInt32(CatalogItem.EndYear)) == 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not be empty!!"
                };
            }
            //else if ((Convert.ToInt32(CatalogItem.BeginYear.ToString()) == 0) || (Convert.ToInt32(CatalogItem.EndYear.ToString()) == 0))
            //{
            //    return new BaseResponse
            //    {
            //        ErrorCode = 3,
            //        Messege = "Mời nhập kiểu số!!"
            //    };
            //}
            else
            {
                _context.Catalogs.Add(CatalogItem);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Add new success!!",
                    Data = CreatedAtAction("Get", new { id = CatalogItem.Id }, CatalogItem)
                };
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> Put(int id,Catalog CatalogItem_Update)
        {
            var CatalogItem = await _context.Catalogs.FindAsync(id);
            var datas = _context.Catalogs.Where(x => x.BeginYear.Equals(Convert.ToInt32(CatalogItem_Update.BeginYear))).Where(y => y.EndYear.Equals(Convert.ToInt32(CatalogItem_Update.EndYear))).ToList();
            if (CatalogItem == null)
            {
                return NotFound();
            }
            if (datas.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 2,
                    Messege = "Catalog already exists. Please check again!!"
                };
            }
            else if ((Convert.ToInt32(CatalogItem_Update.BeginYear)) == 0 || (Convert.ToInt32(CatalogItem_Update.EndYear)) == 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not be empty!!"
                };
            }
            else
            {
                CatalogItem.BeginYear = CatalogItem_Update.BeginYear;
                CatalogItem.EndYear = CatalogItem_Update.EndYear;
                _context.Catalogs.Update(CatalogItem);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Update success!!"
                };
            }
        }

        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> Delete(int id)
        {
            var Catalog =await _context.Catalogs.FindAsync(id);
            if (Catalog != null)
            {
                _context.Catalogs.Remove(Catalog);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Delete success!!",
                    Data = Catalog
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "No data needed to delete!!"
                };
            }

        }
    }
}
