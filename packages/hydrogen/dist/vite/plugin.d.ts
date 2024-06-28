import * as _remix_run_dev_dist_config_routes_js from '@remix-run/dev/dist/config/routes.js';
import * as vite from 'vite';
import { Plugin, ConfigEnv } from 'vite';
import * as _remix_run_dev from '@remix-run/dev';
import { Preset } from '@remix-run/dev';
import { HydrogenPluginOptions } from './types.js';

type HydrogenSharedOptions = Partial<Pick<HydrogenPluginOptions, 'disableVirtualRoutes'> & Pick<ConfigEnv, 'command'> & {
    remixConfig?: Parameters<NonNullable<Preset['remixConfigResolved']>>[0]['remixConfig'];
}>;
/**
 * For internal use only.
 * @private
 */
type HydrogenPlugin = Plugin<{
    registerPluginOptions(newOptions: HydrogenPluginOptions): void;
    getPluginOptions(): HydrogenSharedOptions;
}>;
/**
 * Enables Hydrogen utilities for local development
 * such as GraphiQL, Subrequest Profiler, etc.
 */
declare function hydrogen(pluginOptions?: HydrogenPluginOptions): Plugin[];
declare namespace hydrogen {
    var preset: () => {
        name: string;
        remixConfigResolved({ remixConfig }: {
            remixConfig: Readonly<Pick<_remix_run_dev.ResolvedRemixConfig, "appDirectory" | "future" | "publicPath" | "routes" | "serverModuleFormat"> & {
                basename: string;
                buildDirectory: string;
                buildEnd?: ((args: {
                    buildManifest: _remix_run_dev.BuildManifest | undefined;
                    remixConfig: Readonly<Pick<_remix_run_dev.ResolvedRemixConfig, "appDirectory" | "future" | "publicPath" | "routes" | "serverModuleFormat"> & any>;
                    viteConfig: Readonly<Omit<vite.UserConfig, "plugins" | "css" | "assetsInclude" | "build" | "optimizeDeps" | "worker"> & {
                        configFile: string | undefined;
                        configFileDependencies: string[];
                        inlineConfig: vite.InlineConfig;
                        root: string;
                        base: string;
                        publicDir: string;
                        cacheDir: string;
                        command: "build" | "serve";
                        mode: string;
                        isWorker: boolean;
                        isProduction: boolean;
                        envDir: string;
                        env: Record<string, any>;
                        resolve: Required<vite.ResolveOptions> & {
                            alias: vite.Alias[];
                        };
                        plugins: readonly Plugin<any>[];
                        css: vite.ResolvedCSSOptions;
                        esbuild: false | vite.ESBuildOptions;
                        server: vite.ResolvedServerOptions;
                        build: vite.ResolvedBuildOptions;
                        preview: vite.ResolvedPreviewOptions;
                        ssr: vite.ResolvedSSROptions;
                        assetsInclude: (file: string) => boolean;
                        logger: vite.Logger;
                        createResolver: (options?: Partial<vite.InternalResolveOptions> | undefined) => vite.ResolveFn;
                        optimizeDeps: vite.DepOptimizationOptions;
                        worker: vite.ResolvedWorkerOptions;
                        appType: vite.AppType;
                        experimental: vite.ExperimentalOptions;
                    } & vite.PluginHookUtils>;
                }) => void | Promise<void>) | undefined;
                manifest: boolean;
                publicPath: string;
                serverBuildFile: string;
                serverBundles?: _remix_run_dev.ServerBundlesFunction | undefined;
                ssr: boolean;
            }>;
        }): void;
        remixConfig(): {
            buildDirectory?: undefined;
            routes?: undefined;
        } | {
            buildDirectory: string;
            routes(defineRoutes: typeof _remix_run_dev_dist_config_routes_js.defineRoutes): Promise<_remix_run_dev_dist_config_routes_js.RouteManifest>;
        };
    };
}

export { type HydrogenPlugin, HydrogenPluginOptions, hydrogen };
