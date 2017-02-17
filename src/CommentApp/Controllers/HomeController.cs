using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using System.IO;
using CommentApp.Models;
using Newtonsoft.Json;

namespace CommentApp.Controllers
{
    public class HomeController : Controller
    {
        private const string dataFilePath = "data\\data.json";
        public IActionResult Index()
        {
            return View();
        }

        /// <summary>
        /// GET: load data via ajax
        /// </summary>
        /// <returns></returns>
        public IActionResult LoadData()
        {
            string json = System.IO.File.ReadAllText(dataFilePath);
            return Json(json);
        }

        /// <summary>
        /// GET: save data via ajax
        /// </summary>
        /// <param name="from"></param>
        /// <param name="message"></param>
        /// <param name="parentId"></param>
        /// <returns></returns>
        public IActionResult SaveData(string from, string message, string parentId)
        {
            //Load comments
            List<Comment> comments = LoadComments();
            List<Comment> arrayToAdd = comments;
            List<Comment> replies = null;
            Comment comment = null;

            if (!string.IsNullOrEmpty(parentId))
            {
                Comment parent = comments.FirstOrDefault(c => c.Id.Trim() == parentId.Trim());

                //Re-assign array to add to replies list
                if (parent != null)
                {
                    if (parent.Replies == null)
                        parent.Replies = new List<Comment>();

                    arrayToAdd = parent.Replies;
                }
            }
            else
            {
                replies = new List<Comment>();
            }

            //Add new comment or reply
            if (arrayToAdd != null)
            {
                comment = new Comment
                {
                    Id = string.Format("{0}_{1}", from, DateTime.Now.ToString("yyyyMMddHHmmss")),
                    From = from,
                    Message = message,
                    Created = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss"),
                    Replies = replies
                };

                arrayToAdd.Add(comment);
            }

            //Save data
            bool result = SaveComments(comments);

            return Json(comment);
        }

        /// <summary>
        /// Load list of comments
        /// </summary>
        /// <returns></returns>
        private List<Comment> LoadComments()
        {
            try
            {
                string json = System.IO.File.ReadAllText(dataFilePath);
                List<Comment> items = JsonConvert.DeserializeObject<List<Comment>>(json);
                return items;
            }
            catch
            {
                return null;
            }
        }

        /// <summary>
        /// Save list of comments
        /// </summary>
        /// <param name="comments"></param>
        /// <returns></returns>
        private bool SaveComments(List<Comment> comments)
        {
            try
            {
                string json = JsonConvert.SerializeObject(comments);
                System.IO.File.WriteAllText(dataFilePath,json);
                return true;
            }
            catch
            {
                return false;
            }
            
        }
    }
}
