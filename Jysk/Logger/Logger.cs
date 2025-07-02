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
            using (StreamWriter writer = new StreamWriter(File_path, append: true))
            {
                writer.WriteLine(message);
            }
        }
    }
}
