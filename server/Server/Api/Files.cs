using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;


namespace FinalProjectFileManager.Api
{
  public static class Files
  {

    // Lucas Jenkins - Only overwrites data. Returns only bool upon completion 
    public static bool WriteToFile(string path, string data)
    {
      try
      {
        var fullPath = "./StorageRoot/" + path;
        // var decodedData = Decode(data);
        File.WriteAllText(fullPath, data);
        return true;
      }
      catch (IOException e)
      {
        Console.WriteLine(e.Message);
        return false;
      }

    }

    public static bool DeleteFile(string path)
    {
      try
      {
        var fullPath = "./StorageRoot/" + path;
        File.Delete(fullPath);
        return true;
      }
      catch (IOException e)
      {
        Console.WriteLine(e.Message);
        return false;
      }
    }

    public static void DeleteFiles(string[] paths)
    {
      foreach (var i in paths)
      {
        try
        {
          DeleteFile(i);
        }
        catch (IOException e)
        {
          Console.WriteLine(e.Message);
        }
      }
    }

    // Lucas Jenkins - Will return empty string if file does not exisit
    public static string ReadFromFile(string path)
    {
      try
      {
        var fullPath = "./StorageRoot/" + path;
        var data = "";
        if (File.Exists(fullPath))
        {
          data = File.ReadAllText(fullPath);
          return data;
        }
        return data;
      }
      catch (IOException e)
      {
        Console.WriteLine(e.Message);
        return "";
      }

    }

    public static string Encode(string plainText)
    {
      var plainTextBytes = System.Text.Encoding.UTF8.GetBytes(plainText);
      return System.Convert.ToBase64String(plainTextBytes);
    }

    public static string Decode(string base64EncodedData)
    {
      var base64EncodedBytes = System.Convert.FromBase64String(base64EncodedData);
      return System.Text.Encoding.UTF8.GetString(base64EncodedBytes);
    }

  }
}
