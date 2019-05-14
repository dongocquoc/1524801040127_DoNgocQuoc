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
    public class MajorsController : ControllerBase
    {
        private readonly QLHocVienContext _context;

        public MajorsController(QLHocVienContext context)
        {
            _context = context;
        }

        // GET: api/Majors
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> GetMajor()
        {
            var datas = await _context.Majors.ToListAsync();
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

        // GET: api/Majors/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetMajor(int id)
        {
            var major = await _context.Majors.FindAsync(id);

            if (major != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = new Major()
                    {
                        Id = major.Id,
                        MajorName = major.MajorName
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

        // PUT: api/Majors/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> PutMajor(int id, Major major_update)
        {
            var Maj = await _context.Majors.FindAsync(id);
            var datas = _context.Majors.Where(x => x.MajorName.Equals(major_update.MajorName.Trim())).ToList();
            if (Maj == null)
            {
                return NotFound();
            }
            else if (String.IsNullOrEmpty(major_update.MajorName))
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
                    Messege = "Major already exist!!"
                };
            }
            else
            {
                Maj.MajorName = major_update.MajorName;

                _context.Majors.Update(Maj);
                await _context.SaveChangesAsync();

                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Update thành công!!"
                };
            }
        }

        // POST: api/Majors
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> PostMajor(Major major)
        {
            var datas = _context.Majors.Where(x => x.MajorName.Equals(major.MajorName.Trim())).ToList();
            if (String.IsNullOrEmpty(major.MajorName))
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
                    Messege = "Major already exist!!"
                };
            }
            else
            {
                _context.Majors.Add(major);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Thêm mới thành công!!",
                    Data = CreatedAtAction("GetMajor", new { id = major.Id }, major)
                };
            }
        }

        // DELETE: api/Majors/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> DeleteMajor(int id)
        {
            var major = await _context.Majors.FindAsync(id);
            if (major != null)
            {
                _context.Majors.Remove(major);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Xóa thành công!!",
                    Data = major
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
