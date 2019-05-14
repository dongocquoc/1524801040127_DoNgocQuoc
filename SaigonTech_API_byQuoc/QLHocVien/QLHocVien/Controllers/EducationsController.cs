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
    public class EducationsController : ControllerBase
    {
        private readonly QLHocVienContext _context;

        public EducationsController(QLHocVienContext context)
        {
            _context = context;
        }

        // GET: api/Educations
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> GetEducation()
        {
            var datas = await _context.Educations.ToListAsync();
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

        // GET: api/Educations/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetEducation(int id)
        {
            var education = await _context.Educations.FindAsync(id);

            if (education != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = new Education()
                    {
                        Id = education.Id,
                        EducationName = education.EducationName
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

        // PUT: api/Educations/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> PutEducation(int id, Education education_update)
        {
            var datas = _context.Educations.Where(x => x.EducationName.Equals(education_update.EducationName.Trim())).ToList();
            var Edu = await _context.Educations.FindAsync(id);
            if(Edu == null)
            {
                return NotFound();
            }
            else if (String.IsNullOrEmpty(education_update.EducationName))
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
                    Messege = "Education already exist!!"
                };
            }
            else
            {
                Edu.EducationName = education_update.EducationName;
                _context.Educations.Update(Edu);
                await _context.SaveChangesAsync();

                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Update success!!"
                };
            }
        }

        // POST: api/Educations
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> PostEducation(Education education)
        {
            var datas = _context.Educations.Where(x => x.EducationName.Equals(education.EducationName.Trim())).ToList();
            if (String.IsNullOrEmpty(education.EducationName))
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
                    Messege = "Education already exist!!"
                };
            }
            else
            {
                _context.Educations.Add(education);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Thêm mới thành công!!",
                    Data = CreatedAtAction("GetEducation", new { id = education.Id }, education)
                };
            }
        }

        // DELETE: api/Educations/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> DeleteEducation(int id)
        {
            var education = await _context.Educations.FindAsync(id);
            if (education != null)
            {
                _context.Educations.Remove(education);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Xóa thành công!!",
                    Data = education
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
