import { ConfigurationService } from "./config.service";
import { ConfigModule } from "@nestjs/config";
import { Module } from "@nestjs/common";
import { getEnvPath } from "../common/helper/env.helper"


const envFilePath: string = getEnvPath(`${process.cwd()}/src/common/envs`);


@Module({
  exports: [ConfigurationService],
  imports: [ConfigModule.forRoot({ envFilePath })],
  providers: [ConfigurationService],
})
export class ConfigurationModule {}