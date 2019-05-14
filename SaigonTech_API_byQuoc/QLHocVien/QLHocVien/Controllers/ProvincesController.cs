using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHocVien.Models;
using QLHocVien.Models.Response;

namespace QLHocVien.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProvincesController : ControllerBase
    {
        private readonly QLHocVienContext _context;

        public ProvincesController(QLHocVienContext context)
        {
            _context = context;
        }

        // GET: api/Provinces
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> GetProvince()
        {
            var datas = await _context.Provinces.Include(x=>x.Country).ToListAsync();
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

        // GET: api/Provinces/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetProvince(int id)
        {
            var province = await _context.Provinces.Include(x => x.Country).Where(x=>x.Id == id).FirstOrDefaultAsync();

            if (province != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = province
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

        // GET: api/Provinces/GetProvinceByCountry/{country_id}
        [HttpGet("GetProvinceByCountry/{country_id}")]
        public async Task<ActionResult<BaseResponse>> GetProvinceByCountry(int country_id)
        {
            var province = await _context.Provinces.Include(x => x.Country).Where(x => x.COUNTRY_ID == country_id).ToListAsync();

            if (province != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = province
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

        // PUT: api/Provinces/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> PutProvince(int id, Province province_update)
        {
            var datas = _context.Provinces.Where(x => x.ProvinceName.Equals(province_update.ProvinceName.Trim())).Where(y => y.COUNTRY_ID.Equals(Convert.ToInt32(province_update.COUNTRY_ID))).ToList();
            var Pro = await _context.Provinces.FindAsync(id);
            if(Pro == null)
            {
                return NotFound();
            }
            else if (String.IsNullOrEmpty(province_update.ProvinceName) || Convert.ToInt32(province_update.COUNTRY_ID) == 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not be emty!!"
                };
            }
            else if (datas.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 2,
                    Messege = "Province already exist!!"
                };
            }
            else
            {
                Pro.COUNTRY_ID = province_update.COUNTRY_ID;
                Pro.ProvinceName = province_update.ProvinceName;

                _context.Provinces.Update(Pro);
                await _context.SaveChangesAsync();

                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Update thành công!!"
                };
            }
        }

        // PUT: api/Provinces/5
        [HttpPut("PutProvinceByCountry/{c_id}")]
        public async Task<IActionResult> PutProvinceByCountry(int c_id, Province province_update)
        {
            var Pro = await _context.Provinces.Where(x=>x.COUNTRY_ID==c_id).FirstOrDefaultAsync();
            if (Pro == null)
            {
                return NotFound();
            }
            //Pro.COUNTRY_ID = province_update.COUNTRY_ID;
            Pro.ProvinceName = province_update.ProvinceName;

            _context.Provinces.Update(Pro);
            await _context.SaveChangesAsync();

            return Ok(Pro);
        }

        // POST: api/Provinces
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> PostProvince(Province province)
        {
            var datas = _context.Provinces.Where(x => x.ProvinceName.Equals(province.ProvinceName.Trim())).Where(y => y.COUNTRY_ID.Equals(Convert.ToInt32(province.COUNTRY_ID))).ToList();
            if (String.IsNullOrEmpty(province.ProvinceName) || Convert.ToInt32(province.COUNTRY_ID) == 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Not be emty!!"
                };
            }
            else if(datas.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 2,
                    Messege = "Province already exist!!"
                };
            }
            else
            {
                _context.Provinces.Add(province);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Thêm mới thành công!!",
                    Data = CreatedAtAction("GetProvince", new { id = province.Id }, province)
                };
            }
        }

        // DELETE: api/Provinces/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> DeleteProvince(int id)
        {
            var province = await _context.Provinces.FindAsync(id);
            if (province != null)
            {
                _context.Provinces.Remove(province);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Xóa thành công!!",
                    Data = province
                };
            }
            else
            {
                return new BaseResponse
                {
                    ErrorCode = 0,
                    Messege = "Không tìm thấy dữ liệu cần xóa"
                };
            }
        }
    }
}
