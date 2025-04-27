namespace LoggerLib
{
    public class Logger
    {
        private string File_path { get; set; }
        public Logger()
        {
            File_path = "log.txt";
        }
        public void Log(string message)
        {
            using (StreamWriter write = new StreamWriter(File_path, true))
            {
                write.WriteLine(message);
            }
        }
    }
}
