const NodeResque = require("node-resque");
const nodemailer = require("nodemailer");

async function boot(data) {
  // ////////////////////////
  // SET UP THE CONNECTION //
  // ////////////////////////

  const connectionDetails = {
    pkg: "ioredis",
    host: "127.0.0.1",
    password: null,
    port: 6379,
    database: 0
    // namespace: 'resque',
    // looping: true,
    // options: {password: 'abc'},
  };

  // ///////////////////////////
  // DEFINE YOUR WORKER TASKS //
  // ///////////////////////////


  const jobs = {
    sendMailIN: data => {
      console.log("sendmail called");
      console.log(data);
      var transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: "ashwanikhurana627@gmail.com",
          pass: "ashwanikhurana@2001"
        }
      });

      var mailOptions = {
        from: "ashwanikhurana627@gmail.com",
        to: data.email,
        subject: "Sending Email using Node.js",
        text: "That was easy!"
      };

      transporter.sendMail(mailOptions, function(error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
    }
    // }
  };

  // /////////////////
  // START A WORKER //
  // /////////////////

  const worker = new NodeResque.Worker(
    { connection: connectionDetails, queues: ["math", "otherQueue"] },
    jobs
  );
  await worker.connect();
  worker.start();

  // ////////////////////
  // START A SCHEDULER //
  // ////////////////////

  const scheduler = new NodeResque.Scheduler({ connection: connectionDetails });
  await scheduler.connect();
  scheduler.start();

  // //////////////////////
  // REGISTER FOR EVENTS //
  // //////////////////////

  worker.on("start", () => {
    console.log("worker started");
  });
  worker.on("end", () => {
    console.log("worker ended");
  });
  worker.on("cleaning_worker", (worker, pid) => {
    console.log(`cleaning old worker ${worker}`);
  });
  worker.on("poll", queue => {
    console.log(`worker polling ${queue}`);
  });
  worker.on("ping", time => {
    console.log(`worker check in @ ${time}`);
  });
  worker.on("job", (queue, job) => {
    console.log(`working job ${queue} ${JSON.stringify(job)}`);
  });
  worker.on("reEnqueue", (queue, job, plugin) => {
    console.log(`reEnqueue job (${plugin}) ${queue} ${JSON.stringify(job)}`);
  });
  worker.on("success", (queue, job, result) => {
    console.log(`job success ${queue} ${JSON.stringify(job)} >> ${result}`);
  });
  worker.on("failure", (queue, job, failure) => {
    console.log(`job failure ${queue} ${JSON.stringify(job)} >> ${failure}`);
  });
  worker.on("error", (error, queue, job) => {
    console.log(`error ${queue} ${JSON.stringify(job)}  >> ${error}`);
  });
  worker.on("pause", () => {
    console.log("worker paused");
  });

  scheduler.on("start", () => {
    console.log("scheduler started");
  });
  scheduler.on("end", () => {
    console.log("scheduler ended");
  });
  scheduler.on("poll", () => {
    console.log("scheduler polling");
  });
  scheduler.on("master", state => {
    console.log("scheduler became master");
  });
  scheduler.on("cleanStuckWorker", (workerName, errorPayload, delta) => {
    console.log(
      `failing ${workerName} (stuck for ${delta}s) and failing job ${errorPayload}`
    );
  });
  scheduler.on("error", error => {
    console.log(`scheduler error >> ${error}`);
  });
  scheduler.on("workingTimestamp", timestamp => {
    console.log(`scheduler working timestamp ${timestamp}`);
  });
  scheduler.on("transferredJob", (timestamp, job) => {
    console.log(`scheduler enquing job ${timestamp} >> ${JSON.stringify(job)}`);
  });

  // //////////////////////
  // CONNECT TO A QUEUE //
  // //////////////////////

  const queue = new NodeResque.Queue({ connection: connectionDetails }, jobs);
  queue.on("error", function(error) {
    console.log(error);
  });
  await queue.connect();
  await queue.enqueue("math", "sendMailIN", [data]);  
}

module.exports = boot;
