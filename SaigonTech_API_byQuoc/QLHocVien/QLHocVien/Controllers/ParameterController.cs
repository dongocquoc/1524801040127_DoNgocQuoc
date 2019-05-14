using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using QLHocVien.Models;
using QLHocVien.Models.Request;
using QLHocVien.Models.Response;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace QLHocVien.Controllers
{
  [Route("api/[controller]")]
  [ApiController]
  public class ParameterController : Controller
  {

    private readonly QLHocVienContext _context;
    public ParameterController(QLHocVienContext context)
    {

      this._context = context;
      Parameterequest _paramete = new Parameterequest();
      if (_context.Parameters.ToList().Count() == 0)
      {

        try
        {
          var CurrentIntake = _context.Intakes.Where(it => it.IntakeName.Contains("ISC")).OrderByDescending(s => s.IntakeName).Take(1).ToList();
          foreach (var intake in CurrentIntake)
          {
            _paramete.Intake_Id = intake.Id;
          }
        }
        catch (System.NotImplementedException exception)
        {
          Console.Write(exception);
        }

        try
        {
          var current_year_semeter = (from year in _context.Years
                                      join stage in _context.Stages on year.Id equals stage.YEAR_ID
                                      join semeter in _context.Semesters on stage.SEM_ID equals semeter.Id
                                      orderby year.YearName descending
                                      select new
                                      {
                                        current_year = stage.YEAR_ID,
                                        current_semeter = stage.SEM_ID,

                                      }
          ).Take(1);

          foreach (var yearsemeter in current_year_semeter)
          {
            _paramete.Semeter_Id = yearsemeter.current_semeter;
            _paramete.Year_Id = yearsemeter.current_year;
          }

        }
        catch (Exception e)
        {
          Console.Write("Loi" + e.Message);


        }
        Parameter para = new Parameter
        {
          Singaturename = "TruongPhong",
          Morecontact = "SV01",
          Documentcode = (_paramete.Intake_Id + _paramete.Semeter_Id + _paramete.Year_Id).ToString(),
          yearid = _paramete.Year_Id,
          semid = _paramete.Semeter_Id,
          intakeid = _paramete.Intake_Id

        };

        _context.Parameters.Add(para);
        _context.SaveChanges();


      }


    }





    [HttpGet()]
    public async Task<ActionResult<BaseResponse>> Get()
    {
      var Parameter = await _context.Parameters.ToListAsync();

      if (Parameter == null)
      {
        return new BaseResponse { ErrorCode = 1, Messege = "Danh sách rỗng" };
      }

      return new BaseResponse(Parameter);



    }

    [HttpGet("{id}")]
    public async Task<ActionResult<BaseResponse>> Get(int id)
    {
      var Parameter = await _context.Parameters.FindAsync(id);

      if (Parameter == null)
      {
        return new BaseResponse { ErrorCode = 1, Messege = "Không tìm thấy parameter với: " + id.ToString() };
      }

      return new BaseResponse(Parameter);



    }

    [HttpPut("{id}")]
    public async Task<ActionResult<BaseResponse>> Put(int id, Parameter parameter)
    {
      if (!string.IsNullOrEmpty(parameter.Singaturename) || !string.IsNullOrEmpty(parameter.Documentcode) || !string.IsNullOrEmpty(parameter.Documentcode))
      {
        var ParameterItem = await _context.Parameters.FindAsync(id);
        if(ParameterItem == null)
        {
          return new BaseResponse { ErrorCode = 1, Messege = "Không tìm thấy parareter với:" +id.ToString() };
        }

        ParameterItem.Singaturename = parameter.Singaturename;
        ParameterItem.Morecontact = parameter.Morecontact;
        ParameterItem.Documentcode = parameter.Documentcode;
        ParameterItem.semid = parameter.semid;
        ParameterItem.intakeid = parameter.intakeid;
        ParameterItem.yearid = parameter.yearid;

        _context.Parameters.Update(ParameterItem);
        await _context.SaveChangesAsync();
        return new BaseResponse { ErrorCode = 0, Messege = "Thành công"};
      

      }
      else
      {
        return new BaseResponse { ErrorCode = 1, Messege = "Nhập thiếu tượng" };
      }



    }

  }

}
