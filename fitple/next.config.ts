import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
    // TurboPack 설정
    experimental: {
        turbo: {
            rules: {
                '*.svg': {
                    loaders: ['@svgr/webpack'],
                    as: '*.js',
                },
            },
        },
    },
    images: {
        domains: [
            'img1.kakaocdn.net',
            't1.kakaocdn.net',
            'k.kakaocdn.net',
            'lh3.googleusercontent.com',
            'img1.googleusercontent.com',
        ], // 필요한 다른 도메인도 같이 추가 가능
    },
    // webpack 설정
    webpack: (config) => {
        // @ts-expect-error 타입 에러 무시
        const fileLoaderRule = config.module.rules.find((rule) => rule.test?.test?.('.svg'));

        config.module.rules.push(
            {
                ...fileLoaderRule,
                test: /\.svg$/i,
                resourceQuery: /url/,
            },
            {
                test: /\.svg$/i,
                issuer: fileLoaderRule.issuer,
                resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
                use: [
                    {
                        loader: '@svgr/webpack',
                        options: {
                            typescript: true,
                            ext: 'tsx',
                        },
                    },
                ],
            }
        );
        fileLoaderRule.exclude = /\.svg$/i;
        return config;
    },
};

export default nextConfig;
