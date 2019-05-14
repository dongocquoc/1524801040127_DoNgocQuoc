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
    public class ExamSubjectsController : ControllerBase
    {
        private readonly QLHocVienContext _context;

        public ExamSubjectsController(QLHocVienContext context)
        {
            _context = context;
        }

        // GET: api/ExamSubjects
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> GetExamSubject()
        {
            var datas = await _context.ExamSubjects.Include(x=>x.Major).OrderBy(x=>x.Major).ToListAsync();
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

        // GET: api/ExamSubjects/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetExamSubject(int id)
        {
            var examSubject = await _context.ExamSubjects.Include(x=>x.Major).Where(x => x.Id == id).FirstOrDefaultAsync();

            if (examSubject != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = examSubject
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

        // GET: api/ExamSubjects/GetExamSubjectByMajor/5
        [HttpGet("GetExamSubjectByMajor/{major_id}")]
        public async Task<ActionResult<BaseResponse>> GetExamSubjectByMajor(int major_id)
        {
            var examSubject = await _context.ExamSubjects.Include(x => x.Major).Where(x => x.MAJOR_ID == major_id).ToListAsync();

            if (examSubject != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = examSubject
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

        // PUT: api/ExamSubjects/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> PutExamSubject(int id, ExamSubject examSubjec_updatet)
        {
            var datas = _context.ExamSubjects.Where(x => x.ExamName.Equals(examSubjec_updatet.ExamName.Trim())).Where(y => y.MAJOR_ID.Equals(Convert.ToInt32(examSubjec_updatet.MAJOR_ID))).ToList();
            var Exam = await _context.ExamSubjects.FindAsync(id);
            if(Exam == null)
            {
                return NotFound();
            }
            else if (String.IsNullOrEmpty(examSubjec_updatet.ExamName) || Convert.ToInt32(examSubjec_updatet.MAJOR_ID) == 0)
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
                    Messege = "Exam Subject already exist!!"
                };
            }
            else
            {
                Exam.MAJOR_ID = examSubjec_updatet.MAJOR_ID;
                Exam.ExamName = examSubjec_updatet.ExamName;

                _context.ExamSubjects.Update(Exam);
                await _context.SaveChangesAsync();

                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Update thành công!!"
                };
            }
        }

        // POST: api/ExamSubjects
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> PostExamSubject(ExamSubject examSubject)
        {
            var datas = _context.ExamSubjects.Where(x => x.ExamName.Equals(examSubject.ExamName.Trim())).Where(y => y.MAJOR_ID.Equals(Convert.ToInt32(examSubject.MAJOR_ID))).ToList();
            if (String.IsNullOrEmpty(examSubject.ExamName) || Convert.ToInt32(examSubject.MAJOR_ID) == 0)
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
                    Messege = "Exam Subject already exist!!"
                };
            }
            else
            {
                _context.ExamSubjects.Add(examSubject);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Thêm mới thành công!!",
                    Data = CreatedAtAction("GetExamSubject", new { id = examSubject.Id }, examSubject)
                };
            }
        }

        // DELETE: api/ExamSubjects/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> DeleteExamSubject(int id)
        {
            var examSubject = await _context.ExamSubjects.FindAsync(id);
            if (examSubject != null)
            {
                _context.ExamSubjects.Remove(examSubject);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Xóa thành công!!",
                    Data = examSubject
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
