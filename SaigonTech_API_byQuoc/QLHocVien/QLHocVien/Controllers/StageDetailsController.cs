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
    public class StageDetailsController : ControllerBase
    {
        private readonly QLHocVienContext _context;

        public StageDetailsController(QLHocVienContext context)
        {
            _context = context;
        }

        // GET: api/StageDetails
        [HttpGet]
        public async Task<ActionResult<BaseResponse>> GetStageDetail()
        {
            var stageDetail = await _context.StageDetails.Include(x => x.Major).Include(x => x.Stage).Include(x => x.ExamSubject).ToListAsync();
            if (stageDetail != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Load dữ liệu thành công!!",
                    Data = stageDetail
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

        // GET: api/StageDetails/5
        [HttpGet("{id}")]
        public async Task<ActionResult<BaseResponse>> GetStageDetail(int id)
        {
            var stageDetail = await _context.StageDetails.Include(x => x.Major).Include(x => x.Stage).Include(x => x.ExamSubject).Where(x => x.Id == id).FirstOrDefaultAsync();

            if (stageDetail != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = stageDetail
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

        // GET: api/StageDetails/5
        [HttpGet("GetStageDetailmore/{id}")]
        public async Task<ActionResult<BaseResponse>> GetStageDetailmore(int id)
        {
            var stageDetail = await _context.StageDetails.Include(x => x.Major).Include(x => x.Stage).Include(x => x.ExamSubject).Where(x => x.Id == id).FirstOrDefaultAsync();

            if (stageDetail != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = stageDetail
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

        // GET: api/StageDetails/GetMajorInStageDetail/{stage_id}
        [HttpGet("GetMajorInStageDetail/{stage_id}")]
        public async Task<ActionResult<BaseResponse>> GetStageDetailByCandidate(int stage_id)
        {
            var stageDetail = await _context.StageDetails.Include(x => x.Major).Include(x => x.Stage)
                .Include(x => x.ExamSubject).Where(x => x.Stage_ID == stage_id).GroupBy(x => x.Major_ID).Select(y => new StageDetail
                {
                    Major_ID = y.Key
                }).OrderBy(x => x.Major_ID).ToListAsync();

            if (stageDetail != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = stageDetail
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

        // GET: api/StageDetails/GetMajorInStageDetail/{stage_id}
        [HttpGet("GetSubjectByMajor/{stage_id}")]
        public async Task<ActionResult<BaseResponse>> GetSubjectByMajor(int stage_id)
        {
            var stageDetail = await _context.StageDetails.Include(x => x.Major).Include(x => x.Stage)
                .Include(x => x.ExamSubject).Where(x => x.Stage_ID == stage_id).GroupBy(x => x.Major_ID).Select(y => new StageDetail
                {
                    Major_ID = y.Key,
                    Exam_ID = y.Key
                }).OrderBy(x => x.Major_ID).ToListAsync();

            if (stageDetail != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = stageDetail
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

        // GET: api/StageDetails/GetStageDetailByMajor/{id}
        [HttpGet("GetStageDetailByMajor/{major_id}")]
        public async Task<ActionResult<BaseResponse>> GetStageDetailByMajor(int major_id)
        {
            var stageDetail = await _context.StageDetails.Include(x => x.Major).Include(x => x.Stage).Include(x => x.ExamSubject).Where(x => x.Major_ID == major_id).ToListAsync();

            if (stageDetail != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = stageDetail
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

        // GET: api/StageDetails/GetStageDetailByStage/{id}
        [HttpGet("GetStageDetailByStage/{stage_id}")]
        public async Task<ActionResult<BaseResponse>> GetStageDetailByStage(int stage_id)
        {
            var stageDetail = await _context.StageDetails.Include(x => x.Major).Include(x => x.Stage).Include(x => x.ExamSubject).Where(x => x.Stage_ID == stage_id).ToListAsync();

            if (stageDetail != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = stageDetail
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

        // GET: api/StageDetails/GetStageDetailByStage/{id}
        [HttpGet("GetStageDetailByStageCandidate/{stage_id}")]
        public async Task<ActionResult<BaseResponse>> GetStageDetailByStageCandidate(int stage_id)
        {
            var stageDetail = await _context.StageDetails.Include(a=>a.Major).Where(x => x.Stage_ID == stage_id).GroupBy(y=> new { y.Major_ID}).Select(z=> new StageDetail {
               Major_ID = z.Key.Major_ID,
               Major = new Major
               {
                   Id = z.Key.Major_ID
               }
            }).ToListAsync();

            if (stageDetail != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = stageDetail
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

        // GET: api/StageDetails/GetStageDetailExamSubject/{id}
        [HttpGet("GetStageDetailExamSubject/{id}")]
        public async Task<ActionResult<BaseResponse>> GetStageDetailExamSubject(int subject_id)
        {
            var stageDetail = await _context.StageDetails.Include(x => x.Major).Include(x => x.Stage).Include(x => x.ExamSubject).Where(x => x.Exam_ID == subject_id).ToListAsync();

            if (stageDetail != null)
            {
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Tìm kiếm dữ liệu thành công!!",
                    Data = stageDetail
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

        // PUT: api/StageDetails/5
        [HttpPut("{id}")]
        public async Task<ActionResult<BaseResponse>> PutStageDetail(int id, StageDetail stageDetail_update)
        {
            var datas = _context.StageDetails.Where(x => x.Stage_ID.Equals(Convert.ToInt32(stageDetail_update.Stage_ID))).Where(y => y.Major_ID.Equals(Convert.ToInt32(stageDetail_update.Major_ID))).Where(z => z.Exam_ID.Equals(Convert.ToInt32(stageDetail_update.Exam_ID))).ToList();
            var StageD = await _context.StageDetails.FindAsync(id);
            if (StageD == null)
            {
                return NotFound();
            }
            else if (String.IsNullOrEmpty(stageDetail_update.StarTime) || String.IsNullOrEmpty(stageDetail_update.EndTime) || String.IsNullOrEmpty(stageDetail_update.Interview) || Convert.ToInt32(stageDetail_update.Stage_ID) == 0 || Convert.ToInt32(stageDetail_update.Major_ID) == 0 || Convert.ToInt32(stageDetail_update.Exam_ID) == 0)
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
                    Messege = "Stage Detail already exist!!"
                };
            }
            else
            {
                StageD.Major_ID = stageDetail_update.Major_ID;
                StageD.Stage_ID = stageDetail_update.Stage_ID;
                StageD.Exam_ID = stageDetail_update.Exam_ID;
                StageD.StarTime = stageDetail_update.StarTime;
                StageD.EndTime = stageDetail_update.EndTime;
                StageD.Interview = stageDetail_update.Interview;

                _context.StageDetails.Update(StageD);
                await _context.SaveChangesAsync();

                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Update thành công!!"
                };
            }
        }

        // POST: api/StageDetails
        [HttpPost]
        public async Task<ActionResult<BaseResponse>> PostStageDetail(StageDetail stageDetail)
        {
            var datas = _context.StageDetails.Where(x => x.Stage_ID.Equals(Convert.ToInt32(stageDetail.Stage_ID))).Where(y => y.Major_ID.Equals(Convert.ToInt32(stageDetail.Major_ID))).Where(z => z.Exam_ID.Equals(Convert.ToInt32(stageDetail.Exam_ID))).ToList();
            if (String.IsNullOrEmpty(stageDetail.StarTime) || String.IsNullOrEmpty(stageDetail.EndTime) || String.IsNullOrEmpty(stageDetail.Interview) || Convert.ToInt32(stageDetail.Stage_ID) == 0 || Convert.ToInt32(stageDetail.Major_ID) == 0 || Convert.ToInt32(stageDetail.Exam_ID) == 0)
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
                    Messege = "Stage Detail already exist!!"
                };
            }
            else
            {
                    _context.StageDetails.Add(stageDetail);
                    await _context.SaveChangesAsync();
                    return new BaseResponse
                    {
                        ErrorCode = 1,
                        Messege = "Thêm mới thành công!!",
                        Data = CreatedAtAction("GetStageDetail", new { id = stageDetail.Id }, stageDetail)
                    };

            }
        }

        // DELETE: api/StageDetails/5
        [HttpDelete("{id}")]
        public async Task<ActionResult<BaseResponse>> DeleteStageDetail(int id)
        {
            var stageDetail = await _context.StageDetails.FindAsync(id);
            if (stageDetail != null)
            {
                _context.StageDetails.Remove(stageDetail);
                await _context.SaveChangesAsync();
                return new BaseResponse
                {
                    ErrorCode = 1,
                    Messege = "Xóa thành công!!",
                    Data = stageDetail
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
