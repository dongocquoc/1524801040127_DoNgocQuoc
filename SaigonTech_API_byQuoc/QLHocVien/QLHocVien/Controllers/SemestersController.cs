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
    public class SemestersController : ControllerBase
    {
        private readonly QLHocVienContext _context;

        public SemestersController(QLHocVienContext context)
        {
            _context = context;
        }

        // GET: api/Semesters
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> GetSemester()
        {
            var datas = await _context.Semesters.ToListAsync();
            if(datas != null)
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

        // GET: api/Semesters/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetSemester(int id)
        {
            var semester = await _context.Semesters.FindAsync(id);

            if (semester != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = new Semester()
                    {
                        Id = semester.Id,
                        SemesterName = semester.SemesterName
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

        // PUT: api/Semesters/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> PutSemester(int id, Semester semester_update)
        {
            var datas = _context.Semesters.Where(x => x.SemesterName.Equals(semester_update.SemesterName.Trim())).ToList();
            var Semes = await _context.Semesters.FindAsync(id);
            if (Semes == null)
            {
                return NotFound();
            }
            if (semester_update.SemesterName == "")
            {
                return new BaseResponse
                {
                    ErrorCode = 2,
                    Messege = "Not be emty!!"
                };
            }
            else if (datas.Count != 0)
            {
                return new BaseResponse
                {
                    ErrorCode = 3,
                    Messege = "Semester Name already exist!!"
                };
            }
            else
            {
                Semes.SemesterName = semester_update.SemesterName;
                _context.Semesters.Update(Semes);
                await _context.SaveChangesAsync();

                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Update thành công!!"
                };
            }
        }

        // POST: api/Semesters
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> PostSemester(Semester semester)
        {
            var datas = _context.Semesters.Where(x => x.SemesterName.Equals(semester.SemesterName.Trim())).ToList();
            if (String.IsNullOrEmpty(semester.SemesterName))
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
                    Messege = "Semester Name already exist!!"
                };
            }
            else
            {
                _context.Semesters.Add(semester);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Thêm mới thành công!!",
                    Data = CreatedAtAction("GetSemester", new { id = semester.Id }, semester)
                };
            }
            //return CreatedAtAction("Get", new { id = semester.Id }, semester);
        }

        // DELETE: api/Semesters/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> DeleteSemester(int id)
        {
            var semester = await _context.Semesters.FindAsync(id);
            if (semester != null)
            {
                _context.Semesters.Remove(semester);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Xóa thành công!!",
                    Data = semester
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
