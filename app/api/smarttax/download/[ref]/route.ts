import { NextRequest, NextResponse } from 'next/server';
import { getFiledReturnFile, getFiledReturnRecord } from '@/lib/smarttax/fileStore';
import { verifySecureDownloadToken } from '@/lib/smarttax/secureLinks';

type Params = {
    params: {
        ref: string;
    };
};

export async function GET(request: NextRequest, { params }: Params) {
    const token = request.nextUrl.searchParams.get('token');
    if (!token) {
        return NextResponse.json({ error: 'Missing download token' }, { status: 401 });
    }

    const payload = verifySecureDownloadToken(token);
    if (!payload || payload.ref !== params.ref) {
        return NextResponse.json({ error: 'Invalid or expired download token' }, { status: 403 });
    }

    const [record, fileBuffer] = await Promise.all([
        getFiledReturnRecord(params.ref),
        getFiledReturnFile(params.ref),
    ]);

    if (!record || !fileBuffer) {
        return NextResponse.json({ error: 'Filed return not found' }, { status: 404 });
    }

    if (record.taxId !== payload.taxId) {
        return NextResponse.json({ error: 'Download token does not match the stored Tax ID' }, { status: 403 });
    }

    return new NextResponse(new Uint8Array(fileBuffer), {
        status: 200,
        headers: {
            'Content-Type': record.mimeType,
            'Content-Disposition': `attachment; filename="${record.fileName}"`,
            'Cache-Control': 'private, no-store',
        },
    });
}
