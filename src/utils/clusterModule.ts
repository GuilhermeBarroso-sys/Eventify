import cluster from "cluster";
import { cpus } from "os";
interface IClusterModuleOptions {
  automaticForkWhenExit?: boolean
  automaticForkWhenExitTimer?: number
  numberOfForks?: number

}
export function clusterModule(start : () => void, options?: IClusterModuleOptions | undefined) {
  const isTest = process.env.NODE_ENV == "test" ? true: false
  if(cluster.isPrimary && !isTest) {

    for(let i = 0; i < (!options?.numberOfForks ? cpus().length : options.numberOfForks) ; i++) {
      cluster.fork()
    }
    cluster.on('exit', (worker) => {
      console.log(`Process ${worker.process.pid} died`);
      if(options?.automaticForkWhenExit) {
        console.log(`Automatic Forking is enabled, the process will be forked in ${!options?.automaticForkWhenExitTimer ? 3 : (options.automaticForkWhenExitTimer / 1000).toFixed(0)} seconds.`)
        setTimeout(() => {
          cluster.fork()
        }, !options?.automaticForkWhenExitTimer ? 3000 : options?.automaticForkWhenExitTimer )
      }
    })
  } else {
    start()
  }
}