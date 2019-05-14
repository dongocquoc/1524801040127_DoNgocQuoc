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
    public class ScoreExamsController : ControllerBase
    {
        private readonly QLHocVienContext _context;

        public ScoreExamsController(QLHocVienContext context)
        {
            _context = context;
        }

        // GET: api/ScoreExams
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> GetScoreExam()
        {
            var datas = await _context.ScoreExams.Include(x=>x.Major).Include(x=>x.ExamSubject).ToListAsync();
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

        // GET: api/ScoreExams/GetScoreExamByMajor/{Major_ID}
        [HttpGet("GetScoreExamByMajor/{Major_ID}")]
        public async Task<ActionResult<BaseResponse>> GetScoreExamByMajor(int major_ID)
        {
            var ScoreMajor = await _context.ScoreExams.Include(x => x.Major).Include(x => x.ExamSubject).Where(x=>x.MAJOR_ID==major_ID).ToListAsync();
            if (ScoreMajor != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = ScoreMajor
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

        // GET: api/ScoreExams/GetScoreExamBySubject/{subject_ID}
        [HttpGet("GetScoreExamBySubject/{subject_ID}")]
        public async Task<ActionResult<BaseResponse>> GetScoreExamBySubject(int subject_ID)
        {
            var ScoreMajor = await _context.ScoreExams.Include(x => x.Major).Include(x => x.ExamSubject).Where(x => x.EXAM_ID == subject_ID).ToListAsync();
            if (ScoreMajor != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = ScoreMajor
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

        // GET: api/ScoreExams/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetScoreExam(int id)
        {
            var scoreExam = await _context.ScoreExams.Include(x => x.Major).Include(x => x.ExamSubject).Where(x => x.Id == id).FirstOrDefaultAsync();

            if (scoreExam != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = scoreExam
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

        // PUT: api/ScoreExams/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> PutScoreExam(int id, ScoreExam scoreExam_update)
        {
            var datas = _context.ScoreExams.Where(x => x.EXAM_ID.Equals(Convert.ToInt32(scoreExam_update.EXAM_ID))).Where(y => y.MAJOR_ID.Equals(Convert.ToInt32(scoreExam_update.MAJOR_ID))).ToList();
            var Score = await _context.ScoreExams.FindAsync(id);
            if(Score == null)
            {
                return NotFound();
            }
            else if (Convert.ToInt32(scoreExam_update.MAJOR_ID) == 0 || Convert.ToInt32(scoreExam_update.EXAM_ID) == 0 || Convert.ToInt32(scoreExam_update.ScorePass) == 0 || Convert.ToInt32(scoreExam_update.SumScore) == 0)
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
                    Messege = "Score Exam already exist!!"
                };
            }
            else
            {
                Score.EXAM_ID = scoreExam_update.EXAM_ID;
                Score.MAJOR_ID = scoreExam_update.MAJOR_ID;
                Score.SumScore = scoreExam_update.SumScore;
                Score.ScorePass = scoreExam_update.ScorePass;

                _context.ScoreExams.Update(Score);
                await _context.SaveChangesAsync();

                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Update thành công!!"
                };
            }
        }

        // POST: api/ScoreExams
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> PostScoreExam(ScoreExam scoreExam)
        {
            var datas = _context.ScoreExams.Where(x => x.EXAM_ID.Equals(Convert.ToInt32(scoreExam.EXAM_ID))).Where(y => y.MAJOR_ID.Equals(Convert.ToInt32(scoreExam.MAJOR_ID))).ToList();
            if(Convert.ToInt32(scoreExam.MAJOR_ID) == 0 || Convert.ToInt32(scoreExam.EXAM_ID) == 0 || Convert.ToInt32(scoreExam.ScorePass) == 0 || Convert.ToInt32(scoreExam.SumScore) == 0)
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
                    Messege = "Score Exam already exist!!"
                };
            }
            else
            {
                _context.ScoreExams.Add(scoreExam);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Thêm mới thành công!!",
                    Data = CreatedAtAction("GetScoreExam", new { id = scoreExam.Id }, scoreExam)
                };
            }
        }

        // DELETE: api/ScoreExams/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> DeleteScoreExam(int id)
        {
            var scoreExam = await _context.ScoreExams.FindAsync(id);
            if (scoreExam != null)
            {
                _context.ScoreExams.Remove(scoreExam);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Xóa thành công!!",
                    Data = scoreExam
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
