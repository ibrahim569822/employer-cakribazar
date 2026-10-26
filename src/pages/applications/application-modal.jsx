import React from 'react';
import axios from '../../Lib/axios.js';

const applicationStatuses = {
    1: 'Applied',
    2: 'Viewed',
    3: 'Shortlisted',
    4: 'Interviewed',
    5: 'Hired',
    6: 'Rejected',
};

function ApplicationModal({ application, onClose, onStatusUpdated }) {
    const [details, setDetails] = React.useState(null);
    const [loading, setLoading] = React.useState(true);
    const [error, setError] = React.useState('');
    const [saving, setSaving] = React.useState(false);
    const [status, setStatus] = React.useState(String(application?.status ?? ''));

    React.useEffect(() => {
        if (!application) return undefined;

        let active = true;
        axios.get(`applications/details.php?id=${application.id}`)
            .then((response) => {
                if (active) setDetails(response.data.data);
            })
            .catch((requestError) => {
                if (active) setError(requestError.response?.data?.message || 'Unable to load seeker details.');
            })
            .finally(() => {
                if (active) setLoading(false);
            });

        return () => {
            active = false;
        };
    }, [application]);

    if (!application) return null;

    const handleStatusSubmit = async (event) => {
        event.preventDefault();
        setSaving(true);
        setError('');
        try {
            const formData = new FormData();
            formData.set('status', status);
            await axios.post(`applications/update.php?id=${application.id}`, formData);
            onStatusUpdated(application.id, status);
        } catch (requestError) {
            setError(requestError.response?.data?.message || 'Unable to update application status.');
        } finally {
            setSaving(false);
        }
    };

    const seeker = details?.seeker;
    const profile = details?.profile;
    const resumeUrl = details?.application?.resume
        ? `${import.meta.env.VITE_API_URL.replace(/\/?$/, '/')}${details.application.resume.replace(/^\/+/, '')}`
        : '';

    return (
        <div className="modal fade show d-block" tabIndex="-1" role="dialog" aria-modal="true" aria-labelledby="application-details-title" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
            <div className="modal-dialog modal-xl modal-dialog-centered modal-dialog-scrollable">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title" id="application-details-title">Applicant Details</h5>
                        <button type="button" className="btn-close" aria-label="Close" onClick={onClose} />
                    </div>

                    <div className="modal-body">
                        {error && <div className="alert alert-danger" role="alert">{error}</div>}
                        {loading && <p role="status">Loading applicant details...</p>}

                        {!loading && details && (
                            <>
                                <section className="mb-4">
                                    <h6 className="border-bottom pb-2">Applicant</h6>
                                    {profile?.image && (
                                        <img
                                            src={`${import.meta.env.VITE_API_URL.replace(/\/?$/, '/')}${profile.image.replace(/^\/+/, '')}`}
                                            alt={`${seeker?.name || 'Applicant'} profile`}
                                            className="rounded-circle mb-3"
                                            width="88"
                                            height="88"
                                            style={{ objectFit: 'cover' }}
                                        />
                                    )}
                                    <div className="row">
                                        <div className="col-md-6"><strong>Name:</strong> {seeker?.name || 'Not provided'}</div>
                                        <div className="col-md-6"><strong>Email:</strong> {seeker?.email || 'Not provided'}</div>
                                        <div className="col-md-6"><strong>Username:</strong> {seeker?.username || 'Not provided'}</div>
                                        <div className="col-md-6"><strong>Contact:</strong> {seeker?.contact || 'Not provided'}</div>
                                        <div className="col-md-6"><strong>Job title:</strong> {profile?.job_title || 'Not provided'}</div>
                                        <div className="col-md-6"><strong>Date of birth:</strong> {profile?.date_of_birth || 'Not provided'}</div>
                                        <div className="col-md-6"><strong>Gender:</strong> {profile?.gender ? ({ 1: 'Male', 2: 'Female', 3: 'Other' }[profile.gender] || 'Not provided') : 'Not provided'}</div>
                                        <div className="col-md-6"><strong>Location:</strong> {[profile?.address, profile?.country].filter(Boolean).join(', ') || 'Not provided'}</div>
                                        {profile?.linkedin && <div className="col-md-6"><strong>LinkedIn:</strong> <a href={profile.linkedin} target="_blank" rel="noopener noreferrer">{profile.linkedin}</a></div>}
                                        {profile?.twitter && <div className="col-md-6"><strong>Twitter:</strong> <a href={profile.twitter} target="_blank" rel="noopener noreferrer">{profile.twitter}</a></div>}
                                    </div>
                                    {profile?.summary && (
                                        <div className="mt-3">
                                            <strong>Professional Summary</strong>
                                            <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{profile.summary}</p>
                                        </div>
                                    )}
                                </section>

                                <section className="mb-4">
                                    <h6 className="border-bottom pb-2">Application</h6>
                                    <p><strong>Job:</strong> {details.application?.job_title || application.job_title || 'Not provided'}</p>
                                    <p><strong>Applied:</strong> {details.application?.applied_at || 'Not provided'}</p>
                                    <strong>Cover letter</strong>
                                    <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{details.application?.cover_letter || 'No cover letter provided.'}</p>
                                </section>

                                <section className="mb-4">
                                    <h6 className="border-bottom pb-2">Education</h6>
                                    {details.education.length ? (
                                        <ul className="mb-0">
                                            {details.education.map((item) => (
                                                <li key={item.id}>
                                                    <strong>{item.degree}</strong> — {item.institution}
                                                    {item.field && `, ${item.field}`}
                                                    {item.passing_year && ` (${item.passing_year})`}
                                                    {item.result && ` · Result: ${item.result}`}
                                                </li>
                                            ))}
                                        </ul>
                                    ) : <p className="mb-0 text-muted">No education details provided.</p>}
                                </section>

                                <section className="mb-4">
                                    <h6 className="border-bottom pb-2">Experience</h6>
                                    {details.experience.length ? details.experience.map((item) => (
                                        <div className="mb-3" key={item.id}>
                                            <strong>{item.position}</strong> — {item.company_name}
                                            <div className="text-muted">
                                                {item.start_date} – {Number(item.is_current) ? 'Present' : item.end_date || 'Not specified'}
                                            </div>
                                            {item.description && <p className="mb-0" style={{ whiteSpace: 'pre-line' }}>{item.description}</p>}
                                        </div>
                                    )) : <p className="mb-0 text-muted">No experience details provided.</p>}
                                </section>

                                <section className="mb-4">
                                    <h6 className="border-bottom pb-2">Skills</h6>
                                    {details.skills.length ? <ul className="mb-0">{details.skills.map((skill) => <li key={skill.id}>{skill.name}</li>)}</ul> : <p className="mb-0 text-muted">No skills provided.</p>}
                                </section>

                                <section>
                                    <h6 className="border-bottom pb-2">Uploaded Resume</h6>
                                    {resumeUrl ? (
                                        <a className="btn btn-outline-primary btn-sm" href={resumeUrl} target="_blank" rel="noopener noreferrer">
                                            View Resume
                                        </a>
                                    ) : <p className="mb-0 text-muted">No resume was uploaded.</p>}
                                </section>
                            </>
                        )}
                    </div>

                    <div className="modal-footer d-flex justify-content-between">
                        <form onSubmit={handleStatusSubmit} className="d-flex gap-2">
                            <label className="visually-hidden" htmlFor="application-status">Application status</label>
                            <select id="application-status" name="status" className="form-select" value={status} onChange={(event) => setStatus(event.target.value)}>
                                {Object.entries(applicationStatuses).map(([value, label]) => <option key={value} value={value}>{label}</option>)}
                            </select>
                            <button className="btn btn-primary text-nowrap" type="submit" disabled={saving || loading}>
                                {saving ? 'Saving...' : 'Save Status'}
                            </button>
                        </form>
                        <button type="button" className="btn btn-secondary" onClick={onClose}>Close</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ApplicationModal;
